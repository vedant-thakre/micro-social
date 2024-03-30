import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
const { hash, compare } = pkg;

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
   const { email, password } = req.body;
   try {
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(401).json({ message: "Invalid credentials" });
     }

     const isMatch = await compare(password, user.password);
     if (!isMatch) {
       return res.status(401).json({ message: "Invalid credentials" });
     }

     const token = jwt.sign({ id: user._id }, "your_secret_key", {
       expiresIn: "1h",
     });

     res.status(200).json({ token });
   } catch (error) {
     console.error("Error logging in:", error);
     res.status(500).json({ message: "Internal server error" });
   }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
