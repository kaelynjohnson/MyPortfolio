// contact.controller.js - handles CRUD operations for the contacts collection
import Contact from "../models/contact.model.js";

// GET api/contacts - return all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET api/contacts/:id - return one contact by its id
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST api/contacts - add a new contact
const createContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT api/contacts/:id - update a contact by its id
const updateContactById = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE api/contacts/:id - remove a contact by its id
const deleteContactById = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE api/contacts - remove all contacts
const deleteAllContacts = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: "All contacts deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
  deleteAllContacts,
};