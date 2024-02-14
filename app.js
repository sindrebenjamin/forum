import express from 'express';
import dotenv from 'dotenv';
import dataRouter from './routes/dataRouter.js';
import authRouter from './routes/authRouter.js';
import { app } from './firebase.js';

const expressApp = express();
expressApp.use(express.json());
expressApp.use('/auth', authRouter);
expressApp.use('/data', dataRouter);

const PORT = process.env.PORT || 8080;

expressApp.listen(PORT, () => {
  console.log('Server is running on port 8080');
});
