const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Assignment = require('../models/assignment');

// Home Route (Protected: Only authenticated users can view)
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('index', { user: req.user });
});

// Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register Handle
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('register', { error: 'Please fill in all fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { error: 'Username is already taken' });
    }

    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'An error occurred. Please try again.' });
  }
});

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/assignments', // Redirect to assignments list on success
    failureRedirect: '/login',
    failureFlash: true, // Use flash messages to show login failure
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
});

// Add Assignment Page (Protected: Only logged-in users can access)
router.get('/add-assignment', ensureAuthenticated, (req, res) => {
  res.render('add-assignment');
});

// Handle Add Assignment
router.post('/add-assignment', ensureAuthenticated, async (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return res.render('add-assignment', { error: 'Please fill in all fields' });
  }

  try {
    const newAssignment = new Assignment({ title, description, dueDate, user: req.user.id });
    await newAssignment.save();
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    res.render('add-assignment', { error: 'An error occurred. Please try again.' });
  }
});

// View All Assignments (Protected)
router.get('/assignments', ensureAuthenticated, async (req, res) => {
  try {
    const assignments = await Assignment.find({ user: req.user.id });
    res.render('assignments', { assignments });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Edit Assignment Page (Protected)
router.get('/edit-assignment/:id', ensureAuthenticated, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment || assignment.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/assignments');
    }

    res.render('edit-assignment', { assignment });
  } catch (err) {
    console.error(err);
    res.redirect('/assignments');
  }
});

// Handle Edit Assignment (Protected)
router.post('/edit-assignment/:id', ensureAuthenticated, async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    let assignment = await Assignment.findById(req.params.id);

    if (!assignment || assignment.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/assignments');
    }

    assignment.title = title;
    assignment.description = description;
    assignment.dueDate = dueDate;

    await assignment.save();
    req.flash('success_msg', 'Assignment updated successfully');
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred. Please try again.');
    res.redirect('/assignments');
  }
});

// Delete Assignment (Protected)
router.post('/delete-assignment/:id', ensureAuthenticated, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment || assignment.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/assignments');
    }

    await assignment.remove();
    req.flash('success_msg', 'Assignment deleted successfully');
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred. Please try again.');
    res.redirect('/assignments');
  }
});

// Public Assignments Page (Accessible without login)
router.get('/public-assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('user', 'username');
    res.render('public-assignments', { assignments });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Ensure that the user is authenticated to access specific routes
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/login');
}

module.exports = router;
