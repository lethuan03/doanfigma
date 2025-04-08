const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  coverImage: {
    type: String, // URL ảnh
    required: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String, // HTML content chứa chữ + ảnh
    required: true
  }
});

module.exports = mongoose.model('Article', ArticleSchema);
