import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match!" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //HASH PASWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //https://avatar-placeholder.iran.liara.run/

    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfile : girlProfile,
    });

    if (newUser) {
      //Generate JWT token here
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (err) {
    console.log("Error in sigup controller", err.message);
    res.status(500).json({ error: "Interval Server Error" });
  }
};

export const login = (req, res) => {
  console.log("Login User");
};

export const logout = (req, res) => {
  console.log("Login User");
};
