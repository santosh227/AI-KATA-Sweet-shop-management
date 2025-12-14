import mongoose from 'mongoose';
// creating schema for user
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  { timestamps: true }  // current timestamps
);
// exporting user schema for registering 
export default mongoose.model('User', userSchema);
