import express from 'express';
import authControler from '../controlers/authControler.js';

const { Router } = express;
const authRouter = new Router();
const { 
  register, 
  signin, 
  checkAuth
} = authControler;

authRouter.post('/auth/register', register);
authRouter.post('/auth/signin', signin);
authRouter.post('/auth/check', checkAuth);

export default authRouter;
