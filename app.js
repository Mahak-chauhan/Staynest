if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const express = require("express");
const path = require("path");
const Listing = require("./models/listing");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const userRouter = require("./routes/users");
const listingRoutes = require("./routes/listings");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const reviewRoutes = require("./routes/reviews");
const flash = require("connect-flash");


const app = express();

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/staynest");
}

main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

Listing.find()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ================= SESSION CONFIGURATION =================
const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: false,
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
app.use("/", userRouter);

const port = 3000;

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).send(message);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
