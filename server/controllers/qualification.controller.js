// qualification.controller.js - handles CRUD operations for the qualifications collection
import Qualification from "../models/qualification.model.js";

// GET api/qualifications - return all qualifications
const getAllQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET api/qualifications/:id - return one qualification by its id
const getQualificationById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.json(qualification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST api/qualifications - add a new qualification
const createQualification = async (req, res) => {
  try {
    const newQualification = await Qualification.create(req.body);
    res.status(201).json(newQualification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT api/qualifications/:id - update a qualification by its id
const updateQualificationById = async (req, res) => {
  try {
    const updatedQualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedQualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.json(updatedQualification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE api/qualifications/:id - remove a qualification by its id
const deleteQualificationById = async (req, res) => {
  try {
    const deletedQualification = await Qualification.findByIdAndDelete(req.params.id);
    if (!deletedQualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.json({ message: "Qualification deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE api/qualifications - remove all qualifications
const deleteAllQualifications = async (req, res) => {
  try {
    await Qualification.deleteMany({});
    res.json({ message: "All qualifications deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  getAllQualifications,
  getQualificationById,
  createQualification,
  updateQualificationById,
  deleteQualificationById,
  deleteAllQualifications,
};