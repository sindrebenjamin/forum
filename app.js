import express from 'express';
import dotenv from 'dotenv';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import authRouther from './routes/authRouther.js';
import dataRouter from './routes/dataRouter.js';
import { app } from './firebase.js';

const expressApp = express();
expressApp.use(express.json());
// app.use('/auth', authRouther);
expressApp.use('/data', dataRouter);

expressApp.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      res.send(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
});

const PORT = process.env.PORT || 8080;

expressApp.listen(PORT, () => {
  console.log('Server is running on port 8080');
});
