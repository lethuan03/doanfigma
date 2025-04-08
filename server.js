const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // ✅ THÊM DÒNG NÀY
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const eventRoutes = require('./routes/eventRoutes');
const articleRoutes = require('./routes/articleRoutes');
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weddingEventDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB kết nối thành công'))
.catch(err => console.log('Lỗi kết nối MongoDB:', err));

// Sử dụng routes
// Sử dụng routes
app.use('/api/events', eventRoutes);
app.use('/api/articles', articleRoutes); // ✅ không còn lỗi undefined

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ✅ Đã dùng path ở đây

// Start server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});

module.exports = app;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
