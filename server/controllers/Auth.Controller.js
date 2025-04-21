import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { sendErrorResponse, validateFields } from "../utils/errorHandler.js";
import { sendSuccessResponse } from "../middlewares/errorHandler.js";

//TODO:- REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    const fieldErrors = validateFields(req.body, ["name", "email", "password"]);
    if (fieldErrors.length > 0) {
      return sendErrorResponse(res, 400, "Validation failed", fieldErrors);
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendErrorResponse(res, 400, "User already exists");
    }

    //? Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    return sendSuccessResponse(res, 201, "User registered successfully", {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return sendErrorResponse(res, 500, "Internal server error");
  }
};

//TODO:- LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //? Validation
    const fieldErrors = validateFields(req.body, ["email", "password"]);
    if (fieldErrors.length > 0) {
      return sendErrorResponse(res, 400, "Validation failed", fieldErrors);
    }

    //? User existe or not?
    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, 400, "Invalid credentials");
    }

    //?Jwt token genrate
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return sendSuccessResponse(res, 200, "Login successful", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return sendErrorResponse(res, 500, "Internal server error");
  }
};

//? VERIFY
export const verifyUser = async (req, res) => {
  try {
    const userId = req.user.id; //? Verifyed User Object 
    if (!userId) {
      return sendErrorResponse(res, 400, "User ID not found");
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    return sendSuccessResponse(res, 200, "User verified successfully", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Verify user error:", error);
    return sendErrorResponse(
      res,
      500,
      "Internal server error while verifying user"
    );
  }
};

//! LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    return sendSuccessResponse(res, 200, "Logout successful");
  } catch (error) {
    console.error("Logout error:", error);
    return sendErrorResponse(res, 500, "Server error");
  }
};
