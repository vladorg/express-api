import express from 'express';
import { checkAuth, register, signin } from '../controlers/authControler.js';

const { Router } = express;
const authRouter = new Router();

authRouter.post('/auth/register', register);
authRouter.post('/auth/signin', signin);
authRouter.post('/auth/check', checkAuth);

export default authRouter;
