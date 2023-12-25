import express from 'express';
import userControler from '../controlers/userControler.js';
import { checkAllowUser } from '../middlewares/checkAllowUser.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';

const { Router } = express;
const userRouter = new Router();
const { 
  getAll, 
  getOne, 
  updateUser,
  deleteUser
} = userControler;

userRouter.get('/users/', getAll);
userRouter.get('/users/:id', getOne);
userRouter.put('/users/:id', checkAllowUser, updateUser);
userRouter.delete('/users/:id', checkAdmin, deleteUser);

export default userRouter;
