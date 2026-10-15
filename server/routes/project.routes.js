// project.routes.js - maps project API addresses to their controller functions
import express from "express";
import projectController from "../controllers/project.controller.js";

const router = express.Router();

// Routes for /api/projects
router
  .route("/api/projects")
  .get(projectController.getAllProjects)
  .post(projectController.createProject)
  .delete(projectController.deleteAllProjects);

// Routes for /api/projects/:id
router
  .route("/api/projects/:id")
  .get(projectController.getProjectById)
  .put(projectController.updateProjectById)
  .delete(projectController.deleteProjectById);

export default router;