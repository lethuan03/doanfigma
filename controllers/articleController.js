const Article = require('../models/Article');

// Tạo bài viết
exports.createArticle = async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    const saved = await newArticle.save();
    res.status(201).json({ success: true, message: 'Tạo thành công', data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Lỗi tạo bài viết', error: err.message });
  }
};

// Lấy danh sách bài viết
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishedAt: -1 });
    res.status(200).json({ success: true, count: articles.length, data: articles });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

// Lấy bài viết theo ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Không tìm thấy' });

    res.status(200).json({ success: true, data: article });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Lỗi truy vấn', error: err.message });
  }
};

// Cập nhật bài viết
exports.updateArticle = async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      { ...req.body, publishedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: 'Không tìm thấy' });

    res.status(200).json({ success: true, message: 'Cập nhật thành công', data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Lỗi cập nhật', error: err.message });
  }
};

// Xoá bài viết
exports.deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Không tìm thấy' });

    res.status(200).json({ success: true, message: 'Đã xoá bài viết' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Lỗi xoá', error: err.message });
  }
};
