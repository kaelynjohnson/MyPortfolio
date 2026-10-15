// user.model.js - Mongoose model describing a user account document
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: "Name is required" },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  password: { type: String, required: "Password is required" },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
});

// Hash the password before saving, so it is never stored as plain text
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare a typed password against the saved hash (used when signing in)
UserSchema.methods.authenticate = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

export default mongoose.model("User", UserSchema);