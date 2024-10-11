const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// creating a user

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fill in the required fields" });
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);

    //create a user
    const createdUser = await User.create({ name, email, password: hashpass });

    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating a User" });
  }
};

// login user
module.exports.logedinUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validating email
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      throw new Error("Email does not exist");
    }
    // validate password
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
      throw new Error("Invalid password credentials");
    }

    // create an expiry time
    const time = 1000 * 60 * 60 * 24 * 3;
    // generate jwt token
    const token = await jwt.sign(
      { _id: foundUser._id },
      "VictorCutmycallbecauseofaseries",
      { expiresIn: time }
    );

    //we then proceed to log in the user
    res
      .status(200)
      .cookie("token", token, {
        expiresIn: time,
        // httpOnly:true,
        // secure:true,
        // sameSite: strict
      })
      .json(foundUser);
  } catch (error) {
    res.status(500).json({ message: error.message || "Error login in a User" });
  }
};
