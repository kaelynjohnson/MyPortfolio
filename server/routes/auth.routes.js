// auth.routes.js - maps the sign in and sign out addresses to their controller functions
import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

// Sign in with email and password
router.route("/auth/signin").post(authController.signin);

// Sign out and clear the token cookie
router.route("/auth/signout").get(authController.signout);

export default router;