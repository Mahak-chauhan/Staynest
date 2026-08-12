const express = require("express");
const router = express.Router();

const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner } = require("../middleware");

const multer = require("multer");
const { storage, cloudinary } = require("../cloudConfig/cloudConfig");

const axios = require("axios");

const upload = multer({ storage });


router.get("/", wrapAsync(async (req, res) => {

    const { location } = req.query;

    let listings;

    if (location) {

        listings = await Listing.find({
            location: {
                $regex: location,
                $options: "i"
            }
        });

    } else {

        listings = await Listing.find();

    }

    res.render("listings", {
        listings,
        location
    });

}));


router.get("/new", isLoggedIn, (req, res) => {

    res.render("new");

});


router.post(
    "/",
    isLoggedIn,
    upload.single("image"),
    wrapAsync(async (req, res) => {

        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: req.body.location,
                    format: "json",
                    limit: 1,
                },
                headers: {
                    "User-Agent": "StayNest/1.0"
                }
            }
        );

        if (response.data.length === 0) {

            return res.send(
                "Location not found. Please enter a valid location."
            );

        }

        const location = response.data[0];

        const newListing = new Listing(req.body);

        newListing.owner = req.user._id;

        newListing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };

        newListing.geometry = {
            type: "Point",
            coordinates: [
                Number(location.lon),
                Number(location.lat)
            ]
        };

        await newListing.save();

        res.redirect("/listings");

    })
);


router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(async (req, res) => {

        const { id } = req.params;

        const listing = await Listing.findById(id);

        res.render("edit", { listing });

    })
);


router.patch(
    "/:id",
    isLoggedIn,
    isOwner,
    upload.single("image"),
    wrapAsync(async (req, res) => {

        const { id } = req.params;

        const listing = await Listing.findById(id);

        listing.title = req.body.title;
        listing.price = req.body.price;
        listing.location = req.body.location;


        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: req.body.location,
                    format: "json",
                    limit: 1,
                },
                headers: {
                    "User-Agent": "StayNest/1.0"
                }
            }
        );


        if (response.data.length === 0) {

            return res.send(
                "Location not found. Please enter a valid location."
            );

        }


        const location = response.data[0];

        listing.geometry = {
            type: "Point",
            coordinates: [
                Number(location.lon),
                Number(location.lat)
            ]
        };


        if (req.file) {

            await cloudinary.uploader.destroy(
                listing.image.filename
            );

            listing.image = {
                url: req.file.path,
                filename: req.file.filename,
            };

        }


        await listing.save();

        res.redirect(`/listings/${id}`);

    })
);


router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(async (req, res) => {

        const { id } = req.params;

        await Listing.findByIdAndDelete(id);

        res.redirect("/listings");

    })
);


router.get(
    "/:id",
    wrapAsync(async (req, res) => {

        const { id } = req.params;

        const listing = await Listing.findById(id).populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        });

        res.render("show", { listing });

    })
);


module.exports = router;