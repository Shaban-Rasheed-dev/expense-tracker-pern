import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../../models/Users/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Register a new user
export const signUp = async (req, res) => {
  try {
    //validate the data and cleaned by validate middleware
    const { firstName, lastName, email, password, phoneNo } = req.body;

    // 1. Check if the email is already registered
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //save the user in the database
    const user = await createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNo,
    });
    //Send success response with the created user
    return res.status(201).json({ message: "Sign up successful " });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//login user
export const login = async (req, res) => {
  try {
    //validate the data and cleaned by validate middleware
    const { email, password } = req.body;
    //check if the user in DB
    const existingUser = await findUserByEmail(email);

    //show an error if the user not  in DB
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //Compare the plain password with the stored hash
    const isMatch = await bcrypt.compare(password, existingUser.password);

    //show an error if the user password is not macthed
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //Create a token and send it with the user data
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    //Send success response for login
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser.id,
        firstName: existingUser.first_name,
        lastName: existingUser.last_name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Return the logged-in user's data
export const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Profile error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
