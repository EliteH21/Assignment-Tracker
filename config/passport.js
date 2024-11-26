const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    console.log('Authenticating user:', username);
    
    // Match User
    User.findOne({ username: username })
      .then(user => {
        if (!user) {
          console.log('No user found with username:', username);
          return done(null, false, { message: 'No user found' });
        }

        console.log('User found:', user.username);
        
        // Match Password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error('Error during password comparison:', err);
            return done(err);
          }

          if (isMatch) {
            console.log('Password matched for user:', username);
            return done(null, user);
          } else {
            console.log('Password incorrect for user:', username);
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      })
      .catch(err => {
        console.error('Error during user lookup:', err);
        return done(err);
      });
  }));

  passport.serializeUser((user, done) => {
    console.log('Serializing user:', user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user with id:', id);
    try {
      const user = await User.findById(id);
      if (user) {
        console.log('User found during deserialization:', user.username);
        done(null, user);
      } else {
        console.log('No user found during deserialization for id:', id);
        done(null, null);
      }
    } catch (err) {
      console.error('Error during deserialization:', err);
      done(err, null);
    }
  });
};
