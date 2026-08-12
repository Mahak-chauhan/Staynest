const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("users/signup");
});

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        const newUser = new User({ username });

        await User.register(newUser, password);

        req.flash("success", "Welcome to StayNest! Your account has been created.");

        res.redirect("/listings");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
});

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Invalid username or password!",
    }),
    (req, res) => {

        req.flash("success", `Welcome back, ${req.user.username}!`);

        res.redirect("/listings");
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You have logged out successfully.");

        res.redirect("/listings");
    });
});

module.exports = router;