// qualification.routes.js - maps qualification API addresses to their controller functions
// Anyone can view; only admins can add, edit, or delete
import express from "express";
import qualificationController from "../controllers/qualification.controller.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

// Routes for /api/qualifications
router
  .route("/api/qualifications")
  .get(qualificationController.getAllQualifications)
  .post(
    authController.requireSignin,
    authController.requireAdmin,
    qualificationController.createQualification
  )
  .delete(
    authController.requireSignin,
    authController.requireAdmin,
    qualificationController.deleteAllQualifications
  );

// Routes for /api/qualifications/:id
router
  .route("/api/qualifications/:id")
  .get(qualificationController.getQualificationById)
  .put(
    authController.requireSignin,
    authController.requireAdmin,
    qualificationController.updateQualificationById
  )
  .delete(
    authController.requireSignin,
    authController.requireAdmin,
    qualificationController.deleteQualificationById
  );

export default router;