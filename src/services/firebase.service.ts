import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const app = initializeApp({
  projectId: 'meal-shuffle-hrsl'
});

export default getFirestore(app);
