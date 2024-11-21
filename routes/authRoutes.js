const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/db');
const router = express.Router();

// Route to handle signup form submission
router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Hash the password before saving it
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send('Error hashing password');

        // Save the user to the database
        db.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, hash], (err, result) => {
            if (err) return res.status(500).send('Error registering user');
            res.redirect('/login'); // Redirect to login page after successful signup
        });
    });
});

// Route to handle login form submission
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Retrieve user from the database by username
    db.query('SELECT * FROM user WHERE username = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Error fetching user');
        }
        if (results.length === 0) return res.status(400).send('User not found');
    
        const user = results[0];

        // Compare the password with the hashed password stored in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send('Error checking password');
            if (isMatch) return res.status(401).send('../views/layouts/main-layout.ejs');
    
            // If password matches, create a session and redirect to the homepage
            req.session.userId = user.id;
            res.redirect('/');  // Redirect directly to the homepage after successful login
        });
    });
});

// Route to display login page
router.get('/login', (req, res) => {
    res.render('login', {
        layout: 'layouts/main-layout'
    });
});

// Route to display signup page
router.get('/signup', (req, res) => {
    res.render('signup', {
        layout: 'layouts/main-layout'
    });
});

module.exports = router;
