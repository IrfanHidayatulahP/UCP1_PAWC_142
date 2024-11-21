const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const db = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middleware/middleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'defaultsecret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);

// Use EJS for rendering views
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes for authentication
app.use('/', authRoutes);

// Main route (directly renders index.ejs)
app.get('/', (req, res) => {
    res.render('index', { layout: 'layouts/main-layout' });
});

// Route for viewing list of animals
app.get('/views/daftarHewan.ejs', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM hewan', (err, hewanList) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('hewan', {
            layout: 'layouts/main-layout.ejs',
            hewans: hewanList,
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
