import { addDoc, collection } from 'firebase/firestore/lite';
import { ref, uploadBytes } from 'firebase/storage';
import { myFileStorage, myFirestore } from './firebase.service';

export const uploadPhotoFile = (file: File) => {
  const savedFileName = [
    file.name.split(' ').join('_'), // replace space with underscore
    new Date().getTime()
  ].join('_');

  const storageRef = ref(myFileStorage, `playground_user_photos/${savedFileName}`);
  return uploadBytes(storageRef, file);
};

export const saveUser = (payload: unknown) => {
  return addDoc(collection(myFirestore, 'playground_users'), payload);
};
