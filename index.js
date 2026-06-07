import express from 'express';
const app = express();
import ContactRoutes from './routes/contacts.routes.js';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 3000;

//DB connection
connectDB();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); //pre-requisite for form data parsing
app.use(express.static('public'));

// Routes
app.use("/", ContactRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});