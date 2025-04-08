const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Tạo đơn đặt tiệc mới
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json({
      success: true,
      message: 'Yêu cầu đặt tiệc đã được gửi thành công',
      data: savedEvent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi gửi yêu cầu đặt tiệc',
      error: error.message
    });
  }
});

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