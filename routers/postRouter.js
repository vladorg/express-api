import express from 'express';
import { checkAllowPostUpdate } from '../middlewares/checkAllowPostUpdate.js';
import { checkAuthMiddleware } from '../middlewares/checkAuthMiddleware.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
import postControler from '../controlers/postControler.js';

const { Router } = express;
const postRouter = new Router();
const { 
  getAll, 
  getOne, 
  addPost, 
  updatePost, 
  deletePost 
} = postControler;

postRouter.get('/posts', getAll);
postRouter.get('/posts/:id', getOne);
postRouter.post('/posts', checkAuthMiddleware, addPost);
postRouter.put('/posts/:id', checkAllowPostUpdate, updatePost);
postRouter.delete('/posts/:id', checkAdmin, deletePost);

export default postRouter;
