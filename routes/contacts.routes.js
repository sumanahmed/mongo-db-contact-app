
import express from 'express';
const router = express.Router();
import Contact from '../models/contacts.models.js';
import {
    getAllContacts,
    getContactById,
    addContactPage,
    storeContact,
    getContactForEdit,
    updateContact,
    deleteContact
} from '../controller/contacts.controller.js';
import { validateContact } from '../middleware/validators/contact.validator.js';

router.get('/', getAllContacts);

router.get('/show-contact/:id', getContactById);

router.get('/add-contact', addContactPage);

router.post('/add-contact', validateContact, storeContact);

router.get('/edit-contact/:id', getContactForEdit);

router.post('/update-contact/:id', updateContact);

router.get('/delete-contact/:id', deleteContact);

export default router;