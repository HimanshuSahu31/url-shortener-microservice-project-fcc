const mongoose = require('mongoose');

const shorturlSchema = mongoose.Schema({
  originalUrl: { 
    type: String, 
    match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi, 
    required: true 
  },
  shortUrl: { type: Number, required: true }
});

module.exports = mongoose.model('Shorturl', shorturlSchema);