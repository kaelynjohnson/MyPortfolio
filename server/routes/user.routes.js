// user.routes.js - maps user API addresses to their controller functions
import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

// Routes for /api/users
router
  .route("/api/users")
  .get(userController.getAllUsers)
  .post(userController.createUser)
  .delete(userController.deleteAllUsers);

// Routes for /api/users/:id
router
  .route("/api/users/:id")
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);

export default router;