import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

//const firebaseConfig = {
//  apiKey: "AIzaSyDSk3e1WI3LhsD4knHm0IYlsw2RVkxEvCI",
//  authDomain: "stuff-eefca.firebaseapp.com",
//  projectId: "stuff-eefca",
//  storageBucket: "stuff-eefca.appspot.com",
//  messagingSenderId: "23367142569",
//  appId: "1:23367142569:web:9adf30994851046337adb8",
//  measurementId: "G-RCWFPWF7NZ"
//};

const firebaseConfig = {
  apiKey: "AIzaSyBsZVdAnTZP8Qzkih3Q1E_OHJxx92gagww",
  authDomain: "stuff-2-c806b.firebaseapp.com",
  projectId: "stuff-2-c806b",
  storageBucket: "stuff-2-c806b.appspot.com",
  messagingSenderId: "453250963054",
  appId: "1:453250963054:web:e239073cdd768f56d7b87f",
  measurementId: "G-HYP3BM00KP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);