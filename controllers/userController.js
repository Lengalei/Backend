const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//jsonwebtoken

//registration of a user
module.exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Error creating user" });
    }
    //we want to hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //after hashing the password we create the user with the othere details and the now hashed password
    const createdUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: "Error Getting Users" });
  }
};

//log in a user
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find a user with that email
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).json({ message: "Invalid Email credentials!" });
    }

    //we hash the password received from the frontend and then we validate it against the stored one

    const isValidPass = await bcrypt.compare(password, foundUser.password);
    if (!isValidPass) {
      return res.status(404).json({ message: "Invalid password credentials!" });
    }

    //if a user a user with that email found then we proceed to check the password
    res.status(200).json({ foundUser, message: "All is good. Welcome" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error Logging in a User!" });
  }
};

//get a user
module.exports.getUser = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.stats(400).json({ message: "No users found!" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error Getting Users" });
  }
};

//register user 2.0
module.exports.createrUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    //hash the password then store it
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // we loged in the user
    const createdUser = await User.create({
      userName,
      email,
      password: hashedPass,
    });
    if (!createdUser) {
      return res.status(400).json({ message: "Error creating user" });
    }
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login user
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).json({ message: "Invalid Email credential" });
    }

    //validating the hashed password
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
      return res.status(404).json({ message: "Invalid password credentials" });
    }

    const age = 1000 * 60 * 60 * 24 * 3; // 3 days
    //we want to create the json web token
    const token = jwt.sign({ _id: foundUser._id }, "ruthisbeingapain", {
      expiresIn: age,
    });
    res
      .status(200)
      .cookie("adminToken", token, {
        maxAge: age,
        // httpOnly:true,
        // secure:true
        // sameSite:lax
      })
      .json(foundUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
