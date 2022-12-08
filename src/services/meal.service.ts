import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { myFirestore } from './firebase.service';
import { isValidHttpUrl } from '../../etc/helper';

export interface IMeal {
  name: string;
  imageUrl: string;
}

export const fetchMeal = async () => {
  const col = collection(myFirestore, 'meals');
  const snapshot = await getDocs(col);

  return snapshot.docs.map((doc) => doc.data());
};

export const addMeal = async (payload: IMeal) => {
  // validation
  const isValid = payload.name && isValidHttpUrl(payload.imageUrl);

  /* eslint-disable no-console */
  try {
    if (!isValid) {
      throw new Error('Invalid data!');
    }

    const docRef = await addDoc(collection(myFirestore, 'meals'), payload);
    console.info('Document written with ID:', docRef.id);
  } catch (e) {
    console.error('Error adding document;', e);
    return e instanceof Error ? e.message : e;
  }

  return true;
};
