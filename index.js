const express = require('express');
const mongoose = require('mongoose');
const Contact = require('./models/contacts.models');

const app = express();

//DB connection
mongoose.connect('mongodb://localhost:27017/contacts', )
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); //pre-requisite for form data parsing
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.render('home', { contacts });
});

app.get('/show-contact/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.render('show-contact', { contact });
});

app.get('/add-contact', (req, res) => {
    res.render('add-contact');
});

app.post('/add-contact', async (req, res) => {
    await Contact.create(req.body);
    res.redirect('/');
});

app.get('/edit-contact/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.render('edit-contact', { contact });
});

app.post('/update-contact/:id', async (req, res) => {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

app.get('/delete-contact/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});