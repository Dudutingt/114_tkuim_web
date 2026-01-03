// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // 讀取 .env 檔案

const app = express();

// 中間件 (Middleware)
app.use(cors());
app.use(express.json()); // 讓伺服器讀懂 JSON 格式
const ideaRoutes = require('./routes/ideaRoutes');
app.use('/api/ideas', ideaRoutes);
// 連接 MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ 成功連接到 MongoDB 綠洲！'))
  .catch(err => console.error('❌ 資料庫連線失敗:', err));

// 測試用路由
app.get('/', (req, res) => {
  res.send('靈感綠洲後端伺服器運行中！');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 伺服器已啟動：http://localhost:${PORT}`);
});