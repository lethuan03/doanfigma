const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// CHỖ NÀY mới dùng được req
router.post('/', async (req, res) => {
  try {
    console.log("📨 Body nhận được:", req.body); // ← đặt ở đây nè
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json({ success: true, data: savedEvent });
  } catch (err) {
    console.error('❌ Lỗi lưu event:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;




// Lấy tất cả đơn đặt tiệc
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi lấy danh sách đơn đặt tiệc',
      error: error.message
    });
  }
});

// Lấy chi tiết một đơn đặt tiệc
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn đặt tiệc'
      });
    }
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi lấy thông tin đơn đặt tiệc',
      error: error.message
    });
  }
});

// Cập nhật thông tin đơn đặt tiệc
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn đặt tiệc'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Cập nhật đơn đặt tiệc thành công',
      data: updatedEvent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi cập nhật đơn đặt tiệc',
      error: error.message
    });
  }
});

// Xóa đơn đặt tiệc
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    
    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn đặt tiệc'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Xóa đơn đặt tiệc thành công'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi xóa đơn đặt tiệc',
      error: error.message
    });
  }
});

module.exports = router;