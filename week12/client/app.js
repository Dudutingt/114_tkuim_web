import express from 'express';
import cors from 'cors';
import { connectDB, getCollection } from './db.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

let db;
connectDB().then(database => { db = database; });

// 登入
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await getCollection('users').findOne({ email });
  if (!user) return res.status(401).json({ message: '帳號不存在' });
  // bcrypt 驗證密碼
  const match = await import('bcrypt').then(b => b.compare(password, user.passwordHash));
  if (!match) return res.status(401).json({ message: '密碼錯誤' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

// 取得學生列表
app.get('/students', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: '沒有授權' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') return res.status(403).json({ message: '無權限' });
    const students = await getCollection('users').find({ role: 'student' }).toArray();
    res.json(students);
  } catch {
    res.status(401).json({ message: 'Token 無效' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
