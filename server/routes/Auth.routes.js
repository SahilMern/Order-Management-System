import express from "express";
const router = new express.Router();
import {
  login,
  logout,
  register,
  verifyUser,
} from "../controllers/Auth.Controller.js";
import { authenticate } from "../middlewares/Auth.js";

router.post("/register", register); //? User Register
router.post("/login", login); //? User Login
router.post("/logout", logout); //? User Logout
router.get("/verifyuser", authenticate, verifyUser); //?Verify User

export default router;
