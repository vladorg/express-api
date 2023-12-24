import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routers/postRouter.js';
import userRouter from './routers/userRouter.js';
import authRouter from './routers/authRouter.js';
import fileUpload from 'express-fileupload';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.85bhzmf.mongodb.net/?retryWrites=true&w=majority`;


const serverStart = async () => {
  try {
    mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (err) {
    console.warn(err);
  }
}

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static('static'));

app.use('/api', postRouter);
app.use('/api', userRouter);
app.use('/api', authRouter);

app.get('/', (req, res) => {
  res.send('<h1>Server is working!</h1>')
})

serverStart();
