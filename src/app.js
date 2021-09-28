import express from 'express';
import morgan from 'morgan';

import globalRouter from './routers/global';
import userRouter from './routers/user';
import videoRouter from './routers/video';

const app = express();

app.use(morgan('dev'));

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

app.use(express.urlencoded({ extended: true }));

app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT || 3011;
const handleListening = () => {
  console.log(`✅ Server listenting on http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);

export default app;
