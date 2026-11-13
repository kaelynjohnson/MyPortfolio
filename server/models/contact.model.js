// contact.model.js - Mongoose model describing a contact message document
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstname: { type: String, required: "First name is required" },
  lastname: { type: String, required: "Last name is required" },
  email: { type: String, required: "Email is required" },
  // Optional extras from the contact form
  phone: { type: String },
  message: { type: String },
});

export default mongoose.model("Contact", ContactSchema);