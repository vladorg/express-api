import express from 'express';
import { getAll, getOne, addPost, updatePost, deletePost } from '../controlers/postControler.js'
import checkAuthMiddleware from '../middlewares/checkAuthMiddleware.js';

const { Router } = express;
const postRouter = new Router();

postRouter.get('/posts', getAll);
postRouter.get('/posts/:id', getOne);
postRouter.post('/posts', checkAuthMiddleware, addPost);
postRouter.put('/posts/:id', updatePost);
postRouter.delete('/posts/:id', deletePost);

export default postRouter;
