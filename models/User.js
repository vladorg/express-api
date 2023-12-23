import mongoose from 'mongoose';


const User = new mongoose.Schema({
  name: { type: String, required: true }, 
  login: { type: String, required: true }, 
  password: { type: String, required: true }, 
  role: { type: String, required: true }, 
  level: { type: Number, required: true }, 
})

export default mongoose.model('User', User);
