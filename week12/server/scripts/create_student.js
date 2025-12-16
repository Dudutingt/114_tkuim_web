import bcrypt from 'bcrypt';
import { connectDB, getCollection } from '../db.js';

const [,, email, password] = process.argv;

if (!email || !password) {
  console.log('用法: node scripts/create_student.js email password');
  process.exit(1);
}

(async () => {
  await connectDB();

  const passwordHash = await bcrypt.hash(password, 10);

  await getCollection('users').insertOne({
    email,
    passwordHash,
    role: 'student',      // 這裡指定學生角色
    createdAt: new Date()
  });

  console.log('建立學生帳號成功:', email);
  process.exit(0);
})();
