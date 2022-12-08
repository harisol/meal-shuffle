import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
  projectId: 'meal-shuffle-hrsl',
  storageBucket: 'gs://meal-shuffle-hrsl.appspot.com'
});

export const myFirestore = getFirestore(app);
export const myFileStorage = getStorage(app);
