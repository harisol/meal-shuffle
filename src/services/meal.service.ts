import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { myFirestore as db } from './firebase.service';

export interface IMeal {
  name: string;
  imageUrl: string;
}

export const fetchMeal = async () => {
  const col = collection(db, 'meals');
  const snapshot = await getDocs(col);

  return snapshot.docs.map((doc) => doc.data());
};

export const addMeal = async (payload: IMeal) => {
  try {
    const docRef = await addDoc(collection(db, 'meals'), payload);
    console.log("Document written with ID: ", docRef.id);
  } catch (e: any) {
    console.error('Error adding document: ', e);
    return e?.message || e;
  }

  return true;
};
