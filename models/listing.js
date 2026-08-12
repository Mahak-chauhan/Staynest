const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },

    price: {
        type: Number,
        min: [0, "Price cannot be negative"]
    },

    location: {
        type: String,
        required: [true, "Location is required"]
    },

    image: {
        url: String,
        filename: String,
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    geometry: {
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;