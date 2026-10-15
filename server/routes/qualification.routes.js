// qualification.routes.js - maps qualification API addresses to their controller functions
import express from "express";
import qualificationController from "../controllers/qualification.controller.js";

const router = express.Router();

// Routes for /api/qualifications
router
  .route("/api/qualifications")
  .get(qualificationController.getAllQualifications)
  .post(qualificationController.createQualification)
  .delete(qualificationController.deleteAllQualifications);

// Routes for /api/qualifications/:id
router
  .route("/api/qualifications/:id")
  .get(qualificationController.getQualificationById)
  .put(qualificationController.updateQualificationById)
  .delete(qualificationController.deleteQualificationById);

export default router;