const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    title: { type: String, required: true },    // 靈感標題
    content: { type: String, required: true },  // 靈感內容
    mood: { type: String, default: '💡' },      // 當時心情圖示
    category: { type: String, default: '一般' } // 分類
}, { timestamps: true }); // 自動幫你加 createdAt 和 updatedAt 時間欄位

module.exports = mongoose.model('Idea', ideaSchema);