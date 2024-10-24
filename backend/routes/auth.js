const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, Restaurant } = require("../models");

// ----- set up the signup router ------ //
router.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // store user's info in the session to indicate the user is logged in
    req.session.userId = user.id;

    // return good status
    return res.status(201).json({
      message: "The user is created!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    } else if (err.name === "SequelizeUniqueConstraintError") {
      // when the username is not unique in the db
      return res
        .status(422)
        .json({ errors: "this username is being used by another user" });
    }
    const errMessage = err.message;
    res.status(500).json({
      message: "Error occured while creating user",
      error: errMessage,
    });
  }
});

// login user and store userId in the session
router.post("/login", async (req, res) => {
  try {
    // find an account in the db table if there is one
    const user = await User.findOne({
      where: { email: req.body.email },
      include: {
        model: Restaurant,
        attributes: ["id", "restaurantName"],
      },
    });

    if (user === null) {
      return res.status(401).json({
        message: "Invalid email or password", // but in this case, only the email is invalid
      });
    }

    // compare to see if the password is correct or not
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        // seting session with user's id
        req.session.userId = user.id;
        return res.status(200).json({
          message: "Logged in successfully",
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            hasRestaurant: user.hasRestaurant,
            profileImage: user.profileImage,
            restaurants: user.Restaurants,
          },
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" }); // if there is wrong password
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occured during the login process",
    });
  }
});

// log user out and clear the session
router.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }

    res.clearCookie("connect.sid"); // clear the cookie
    return res.sendStatus(200);
  });
});

// router get current_user to see if any user is logged in or not
router.get("/current_user", async (req, res) => {
  if (req.session.userId) {
    const user = await User.findOne({
      where: { id: req.session.userId },
      include: {
        model: Restaurant,
        attributes: ["id", "restaurantName"],
      },
    });
    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        hasRestaurant: user.hasRestaurant,
        restaurants: user.Restaurants,
        profileImage: user.profileImage,
      },
    });
  } else {
    return res.status(401).json({ user: null });
  }
});

module.exports = router;
