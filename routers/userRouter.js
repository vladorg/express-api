import express from 'express';
import userControler from '../controlers/userControler.js';
import { checkAllowUser } from '../middlewares/checkAllowUser.js';

const { Router } = express;
const userRouter = new Router();
const { 
  getAll, 
  getOne, 
  updateUser
} = userControler;

userRouter.get('/users/:id', checkAllowUser, getOne);
userRouter.put('/users/:id', checkAllowUser, updateUser);

export default userRouter;
