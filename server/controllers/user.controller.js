// user.controller.js - handles CRUD operations for the users collection
import User from "../models/user.model.js";

// GET api/users - return all users (password is left out of the response)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET api/users/:id - return one user by their id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST api/users - sign up a new user; the role is always "user" so nobody can sign up as admin
const createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: "user",
    });
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      created: newUser.created,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT api/users/:id - update a user by their id; the role cannot be changed here
const updateUserById = async (req, res) => {
  try {
    const { role, ...safeData } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...safeData, updated: Date.now() },
      { new: true, runValidators: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE api/users/:id - remove a user by their id
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE api/users - remove all users
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  deleteAllUsers,
};