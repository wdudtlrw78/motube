import express from 'express';
import { register, login } from '../controllers/user';
import { trending, search } from '../controllers/video';

const globalRouter = express.Router();

globalRouter.get('/', trending);
globalRouter.get('/register', register);
globalRouter.get('/login', login);
globalRouter.get('/search', search);

export default globalRouter;
