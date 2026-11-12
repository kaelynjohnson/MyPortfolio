// contact.routes.js - maps contact API addresses to their controller functions
// Anyone can send a message; signed-in users can view; only admins can edit or delete
import express from "express";
import contactController from "../controllers/contact.controller.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

// Routes for /api/contacts
router
  .route("/api/contacts")
  .get(authController.requireSignin, contactController.getAllContacts)
  .post(contactController.createContact)
  .delete(
    authController.requireSignin,
    authController.requireAdmin,
    contactController.deleteAllContacts
  );

// Routes for /api/contacts/:id
router
  .route("/api/contacts/:id")
  .get(authController.requireSignin, contactController.getContactById)
  .put(
    authController.requireSignin,
    authController.requireAdmin,
    contactController.updateContactById
  )
  .delete(
    authController.requireSignin,
    authController.requireAdmin,
    contactController.deleteContactById
  );

export default router;