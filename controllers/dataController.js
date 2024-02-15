import { app } from '../firebase.js';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

let token;
let uid;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    token = await user.getIdToken();
    uid = user.uid;
  } else {
    // User is signed out
    // ...
  }
});

const db = getFirestore(app);

export const getData = async (req, res) => {
  req.headers.authorization = `Bearer ${token}`;

  const dataCollection = collection(db, 'Posts');
  const dataSnapshot = await getDocs(dataCollection);
  if (dataSnapshot.empty) {
    res.json('No data found');
  }

  const data = dataSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  res.json(data);
};

export const postData = async (req, res) => {
  req.headers.authorization = `Bearer ${token}`;

  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json('Title and content are required');
  }

  const dataCollection = collection(db, 'Posts');
  await addDoc(dataCollection, {
    title,
    content,
    author: uid,
  });

  res.json('Post added');
};

export const deleteData = async (req, res) => {
  req.headers.authorization = `Bearer ${token}`;

  const { id } = req.params;
  if (!id) {
    return res.status(400).json('Id is required');
  }

  const dataCollection = collection(db, 'Posts');
  const dataSnapshot = await getDocs(dataCollection);
  const docRef = doc(dataCollection, id);
  if (!docRef) {
    return res.status(404).json('Post not found');
  }

  const author = dataSnapshot.docs.find((doc) => doc.id === id).data().author;

  if (!author) {
    return res.status(404).json('Author not found');
  } else {
    if (author !== uid) {
      return res.status(403).json('Unauthorized');
    }
  }

  await deleteDoc(docRef);

  res.json(`Post deleted with id: ${id}`);
};

export const updateData = async (req, res) => {
  req.headers.authorization = `Bearer ${token}`;

  const { id } = req.params;
  if (!id) {
    return res.status(400).json('Id is required');
  }

  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json('Title and content are required');
  }

  const dataCollection = collection(db, 'Posts');
  const dataSnapshot = await getDocs(dataCollection);
  const docRef = doc(dataCollection, id);
  if (!docRef) {
    return res.status(404).json('Post not found');
  }

  const author = dataSnapshot.docs.find((doc) => doc.id === id).data().author;

  if (!author) {
    return res.status(404).json('Author not found');
  } else {
    if (author !== uid) {
      return res.status(403).json('Unauthorized');
    }
  }

  await setDoc(docRef, {
    title,
    content,
  });

  res.json(`Post updated with id: ${id}`);
};
