const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

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
