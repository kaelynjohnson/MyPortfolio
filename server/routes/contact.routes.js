// contact.routes.js - maps contact API addresses to their controller functions
import express from "express";
import contactController from "../controllers/contact.controller.js";

const router = express.Router();

// Routes for /api/contacts
router
  .route("/api/contacts")
  .get(contactController.getAllContacts)
  .post(contactController.createContact)
  .delete(contactController.deleteAllContacts);

// Routes for /api/contacts/:id
router
  .route("/api/contacts/:id")
  .get(contactController.getContactById)
  .put(contactController.updateContactById)
  .delete(contactController.deleteContactById);

export default router;