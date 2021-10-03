import express from 'express';
import { register, login } from '../controllers/user';
import { home } from '../controllers/video';

const globalRouter = express.Router();

globalRouter.get('/', home);
globalRouter.get('/register', register);
globalRouter.get('/login', login);

export default globalRouter;
