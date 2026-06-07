import Contact from "../models/contacts.models.js";

const getAllContacts = async (req, res) => {
    const contacts = await Contact.find();
    res.render('home', { contacts });
};

const getContactById = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.render('show-contact', { contact });
};

const addContactPage = (req, res) => {
    res.render('add-contact');
};

const storeContact = async (req, res) => {
    await Contact.create(req.body);
    res.redirect('/');
};
 
const getContactForEdit = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.render('edit-contact', { contact });
};

const updateContact = async (req, res) => {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
};

const deleteContact = async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
};

export { getAllContacts, getContactById, addContactPage, storeContact, getContactForEdit, updateContact, deleteContact };