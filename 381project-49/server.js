const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Database connection
mongoose.connect('mongodb+srv://bondlcf123:123@cluster0.hchfj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    // Handle login logic
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/api/create', (req, res) => {
    const newUser = new User({
        username: req.query.username,
        password: req.query.password
    });
    newUser.save((err) => {
        if (err) {
            res.status(500).send('Error creating user');
        } else {
            res.status(200).send('User created successfully');
        }
    });
});

// Create Route
app.post('/create', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save((err) => {
        if (err) {
            res.status(500).send('Error creating user');
        } else {
            res.status(200).send('User created successfully');
        }
    });
});

// Read Route
app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).send('Error reading users');
        } else {
            res.status(200).json(users);
        }
    });
});

app.post('/api/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).send('Error reading users');
        } else {
            res.status(200).json(users);
        }
    });
});

// Update Route
app.put('/update/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.password
    }, (err) => {
        if (err) {
            res.status(500).send('Error updating user');
        } else {
            res.status(200).send('User updated successfully');
        }
    });
});

app.put('/api/update/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.password
    }, (err) => {
        if (err) {
            res.status(500).send('Error updating user');
        } else {
            res.status(200).send('User updated successfully');
        }
    });
});

// Delete Route
app.delete('/delete/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.status(500).send('Error deleting user');
        } else {
            res.status(200).send('User deleted successfully');
        }
    });
});

app.delete('/api/delete/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.status(500).send('Error deleting user');
        } else {
            res.status(200).send('User deleted successfully');
            res.redirect('/admin');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
 