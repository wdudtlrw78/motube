import express from 'express';
import { getEdit, postEdit, watch } from '../controllers/video';

const videoRouter = express.Router();

videoRouter.get('/:id(\\d+)', watch);
videoRouter.route('/:id(\\d+)/edit').get(getEdit).post(postEdit);

export default videoRouter;
