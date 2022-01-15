import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';

import { AppRouter } from './AppRouter';
import './controllers/RootController';
import './controllers/LoginController';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['hihi'] }));

app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('listening port 3000');
});
