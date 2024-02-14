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

const db = getFirestore(app);

export const getData = async (req, res) => {
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
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json('Title and content are required');
  }

  const dataCollection = collection(db, 'Posts');
  await addDoc(dataCollection, {
    title,
    content,
  });

  res.json('Post added');
};

export const deleteData = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json('Id is required');
  }

  const dataCollection = collection(db, 'Posts');
  const docRef = doc(dataCollection, id);
  if (!docRef) {
    return res.status(404).json('Post not found');
  }

  await deleteDoc(docRef);

  res.json(`Post deleted with id: ${id}`);
};

export const updateData = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json('Id is required');
  }

  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json('Title and content are required');
  }

  const dataCollection = collection(db, 'Posts');
  const docRef = doc(dataCollection, id);
  if (!docRef) {
    return res.status(404).json('Post not found');
  }

  await setDoc(docRef, {
    title,
    content,
  });

  res.json(`Post updated with id: ${id}`);
};
