const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getUsersList = async () => {
  try {
    const users = await User.find().select('-password');
    return users;
  } catch (error) {
    throw error;
  }
};
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("user exists");
      return res
        .status(400)
        .json({ message: "User email already exits,use another Email ! " });
    }

    const user = new User({
      name,
      email,
      password,
      apartment: req.body.apartment,
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
      zip: req.body.zip,
      phone: req.body.phone,
    });

    if (user) {
      const token = generateToken(res, user);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
      await user.save();
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400);
    // throw new Error(error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user.email);
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(res,user);
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      return res.status(400).json({message:"Invalid credentials"});
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    return res.status(400).json(error.message);
    throw new Error(error.message);
  }
};
const generateToken = (res, user) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "JWT_SECRET environment variable is not set" });
    }
    return jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
    );
  } catch (error) {
    console.error("Error generating token:", error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

module.exports = { getUsersList,registerUser, loginUser };
