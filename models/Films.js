const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  watched: {
    type: Boolean,
    required: true
  },
  year: {
    type: String,
    required: false
  }
});

module.exports = model('Films', schema);