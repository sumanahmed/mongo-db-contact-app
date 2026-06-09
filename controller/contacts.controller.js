import Contact from "../models/contacts.models.js";
import mongoose from "mongoose";

const getAllContacts = async (req, res) => {
    // const contacts = await Contact.find();
    const { page = 1, limit = 2 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    };
    const result = await Contact.paginate({}, options);
    res.render('home', { 
        contacts: result.docs,
        totalPages: result.totalPages,
        currentPage: result.page,
        totalContacts: result.totalDocs,
        limit: result.limit,
        counter: result.pagingCounter,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage
     });
};

const getContactById = async (req, res) => {
    var paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId) {
        return res.render('404', { message: 'Invalid ID' });
    }
    try {
        const contact = await Contact.findById(req.params.id);
        if(!contact) return res.render('404', { message: 'Contact not found' });
        res.render('show-contact', { contact });
    } catch (error) {
        res.render('404', { message: error });
    }
};

const addContactPage = (req, res) => {
    res.render('add-contact');
};

const storeContact = async (req, res) => {
    try {
        await Contact.create(req.body);
        res.redirect('/');
    } catch (error) {
        res.render('500', { message: error });
    }
};
 
const getContactForEdit = async (req, res) => {
    var paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId) {
        return res.render('404', { message: 'Invalid ID' });
    }
    try {
        const contact = await Contact.findById(req.params.id);
        if(!contact) return res.render('404', { message: 'Contact not found' });
        res.render('edit-contact', { contact });
    } catch (error) {
        res.render('404', { message: 'Contact not found' });
    }
};

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body);
        if(!contact) return res.render('404', { message: 'Contact not found' });
        res.redirect('/');
    } catch (error) {
        res.render('500', { message: error });
    }
};

const deleteContact = async (req, res) => {
    var paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId) {
        return res.render('404', { message: 'Invalid ID' });
    }
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if(!contact) return res.render('404', { message: 'Contact not found' });
        res.redirect('/');
    } catch (error) {
        res.render('500', { message: error });
    }
};

export { getAllContacts, getContactById, addContactPage, storeContact, getContactForEdit, updateContact, deleteContact };