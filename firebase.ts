import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getFunctions} from  "firebase/functions";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "",
  authDomain: "dropbox-clone-b984f.firebaseapp.com",
  projectId: "dropbox-clone-b984f",
  storageBucket: "dropbox-clone-b984f.appspot.com",
  messagingSenderId: "",
  appId: "1:741809780823:web:4b7a4e606ed5c1c53c4b12"
};

// Initialize Firebase
const app =getApps.length ? getApp():initializeApp(firebaseConfig);// to avoid multiple intialization of the app
const db=getFirestore(app);
const storage=getStorage(app);
export {db,storage};