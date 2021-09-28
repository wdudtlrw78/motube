import express from 'express';
import { register, login } from '../controllers/user';
import { trending } from '../controllers/video';

const globalRouter = express.Router();

globalRouter.get('/', trending);
globalRouter.get('/register', register);
globalRouter.get('/login', login);

export default globalRouter;
