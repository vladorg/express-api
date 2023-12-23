import mongoose from 'mongoose';


const Post = new mongoose.Schema({
  title: { type: String, required: true }, 
  content: { type: String, required: true }, 
  date: { type: String, required: true },  
  author: {
    name: { type: String, required: true },
    role: { type: String },
    id: { type: String, required: true },
    login: { type: String, required: true },
  }
})

export default mongoose.model('Post', Post);
