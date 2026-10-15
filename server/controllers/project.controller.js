// project.controller.js - handles CRUD operations for the projects collection
import Project from "../models/project.model.js";

// GET api/projects - return all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET api/projects/:id - return one project by its id
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST api/projects - add a new project
const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT api/projects/:id - update a project by its id
const updateProjectById = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE api/projects/:id - remove a project by its id
const deleteProjectById = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE api/projects - remove all projects
const deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany({});
    res.json({ message: "All projects deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectById,
  deleteAllProjects,
};