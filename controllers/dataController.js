import { app } from '../firebase.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(app);

export const getData = async (req, res) => {
  const dataCollection = collection(db, 'Posts');
  const dataSnapshot = await getDocs(dataCollection);
  const data = dataSnapshot.docs.map((doc) => doc.data());

  res.json(data);
};
