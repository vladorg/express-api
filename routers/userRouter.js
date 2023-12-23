import express from 'express';
import { getUserInfo, updateUser } from '../controlers/userControler.js';
import checkAllowUser from '../middlewares/checkAllowUser.js';

const { Router } = express;
const userRouter = new Router();

userRouter.get('/users/:id', checkAllowUser, getUserInfo);
userRouter.put('/users/:id', checkAllowUser, updateUser);

export default userRouter;
