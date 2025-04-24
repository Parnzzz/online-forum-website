import mongoose from 'mongoose';
import User from './models/user.js'; // ปรับ path ตามจริง

await mongoose.connect("mongodb+srv://..."); // ใช้ MONGODB_URI ของคุณ

const newUser = await User.create({
  name: 'test',
  email: 'test@example.com',
  password: '123456',
});

console.log("User saved:", newUser);