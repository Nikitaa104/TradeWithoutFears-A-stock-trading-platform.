
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/SecretToken");

// login
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.json({ success: false, message: "Incorrect password or email" });
    }

    console.log("LOGIN PASSWORD:", password);
    console.log("TYPE:", typeof password);
    console.log("CHARS:", [...password]);

    const auth = await bcrypt.compare(String(password).trim(), user.password);

    console.log("Password match:", auth);

    if (!auth) {
      return res.json({ success: false, message: "Incorrect password or email" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });

  } catch (error) {
    console.error(error);
  }
};


// Signup
module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    console.log("SIGNUP PASSWORD:", password);
    console.log("TYPE:", typeof password);
    console.log("CHARS:", [...password]);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(String(password).trim(), 10);

    const user = await User.create({
      email,
      password,
      username,
    });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
    });

  } catch (error) {
    console.error(error);
  }
};