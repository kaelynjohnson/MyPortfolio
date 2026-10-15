// user.routes.js - maps user API addresses to their controller functions
// Everything except creating a user (sign up) is protected and needs a valid token
import express from "express";
import userController from "../controllers/user.controller.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

// Routes for /api/users
router
  .route("/api/users")
  .get(authController.requireSignin, userController.getAllUsers)
  .post(userController.createUser)
  .delete(authController.requireSignin, userController.deleteAllUsers);

// Routes for /api/users/:id
router
  .route("/api/users/:id")
  .get(authController.requireSignin, userController.getUserById)
  .put(authController.requireSignin, userController.updateUserById)
  .delete(authController.requireSignin, userController.deleteUserById);

export default router;