const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://wizardlalit007:fxcAUUmj4dS748bv@cluster0.m5vd6qo.mongodb.net/?retryWrites=true&w=majority'; 

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error:', error);
  });

module.exports = dbURI; // Export the MongoDB connection URI

