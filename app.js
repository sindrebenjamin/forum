import express from 'express';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCzOW1PaEGuaT_4EfScZzDeo7U_S5oanb8',
  authDomain: 'forum-414310.firebaseapp.com',
  projectId: 'forum-414310',
  storageBucket: 'forum-414310.appspot.com',
  messagingSenderId: '456924353762',
  appId: '1:456924353762:web:932638137493d647b3babb',
  measurementId: 'G-MT6GQHD8BY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const expressApp = express();
expressApp.use(express.json());

expressApp.get('/', (req, res) => {
  res.send('Hello World');
});

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
