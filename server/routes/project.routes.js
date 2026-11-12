// project.routes.js - maps project API addresses to their controller functions
// Anyone can view; only admins can add, edit, or delete
import express from "express";
import projectController from "../controllers/project.controller.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

// Routes for /api/projects
router
  .route("/api/projects")
  .get(projectController.getAllProjects)
  .post(
    authController.requireSignin,
    authController.requireAdmin,
    projectController.createProject
  )
  .delete(
    authController.requireSignin,
    authController.requireAdmin,
    projectController.deleteAllProjects
  );

// Routes for /api/projects/:id
router
  .route("/api/projects/:id")
  .get(projectController.getProjectById)
  .put(
    authController.requireSignin,
    authController.requireAdmin,
    projectController.updateProjectById
  )
  .delete(
    authController.requireSignin,
    authController.requireAdmin,
    projectController.deleteProjectById
  );

export default router;