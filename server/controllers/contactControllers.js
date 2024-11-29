const Contact = require('../models/Contact');

// GET /api/Contact - Fetch Contact filtered by user’s id
const getContact = async (req, res) => {
    try {
        const contacts = await Contact.find({ createdBy: req.user.id });
        res.status(200).json({contact:contacts});
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Contact' });
    }
};

// POST /api/Contact - Create new Contact
const createContact = async (req, res) => {
    const { name, number, email } = req.body;

    try {
        const newContact = new Contact({
            name,
            number:parseInt(number),
            email,
            createdBy: req.user.id,
        });

        await newContact.save();
        res.status(201).json({ message: 'Contact created successfully', Contact: newContact });
    } catch (error) {
        res.status(500).json({ error: 'Error creating Contact',error });
    }
};

// PUT /api/Contact/:id - Update Contact 
const updateContact = async (req, res) => {
    const { name, number, email } = req.body;

    try {
        const id = req.params.id;

        // Find the contact by ID
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        // Update fields if provided in the request
        if (name) contact.name = name;
        if (number) contact.number = number;
        if (email) contact.email = email;

        // Save the updated contact
        await contact.save();

        res.status(200).json({ message: "Contact updated successfully", contact });
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE /api/Contact/:id - Delete Contact
const deleteContact = async (req, res) => {

    try {
        const id = String(req.params.id);
        const contact = await Contact.findOneAndDelete({ _id: id });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found or unauthorized' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting Contact' });
    }
};

const deleteUserContacts = async (userId) => {
  try {
    await Contact.deleteMany({ createdBy:userId });
    console.log("All contacts associated with the user have been deleted.");
  } catch (error) {
    console.error("Error deleting contacts:", error);
    throw new Error("Failed to delete contacts");
  }
};

module.exports = {
    getContact,
    createContact,
    updateContact,
    deleteContact,
    deleteUserContacts
};
