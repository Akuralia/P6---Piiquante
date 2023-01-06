const express = require('express');
const mongoose = require('./models/dbConfig');
const sauces = require('./models/Sauces');
const userRoutes = require('./routes/user');
const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// POST routes user
app.use('/api/auth', userRoutes);

// POST des sauces
app.post('/api/sauces', (req, res, next) => {
  delete req.body._id;
  const thing = new Sauces({
    ...req.body
  });
  sauces.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;