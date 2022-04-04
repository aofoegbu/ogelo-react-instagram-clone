import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlPCFGZ1H_Q73OLfD3hHZGZ9YBSvMf8Ec",
  authDomain: "ogelo-react-instagram-clone.firebaseapp.com",
  projectId: "ogelo-react-instagram-clone",
  storageBucket: "ogelo-react-instagram-clone.appspot.com",
  messagingSenderId: "933748725543",
  appId: "1:933748725543:web:55ea2c704cf45ae70e7b02",
  measurementId: "G-HZJ2W7LBPE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
export const storageRef = ref(storage);
// export {auth, app, db};
