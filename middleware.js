const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
        return res.redirect("/listings");
    }

    if (!listing.owner) {
        return res.redirect("/listings");
    }

    if (!listing.owner.equals(req.user._id)) {
        return res.redirect("/listings");
    }

    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {

    let { reviewId } = req.params;

    let review = await Review.findById(reviewId);

    if (!review) {
        return res.redirect("/listings");
    }

    if (!review.author.equals(req.user._id)) {
        return res.redirect("/listings");
    }

    next();
};