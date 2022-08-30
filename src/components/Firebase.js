import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDwTvbYFaz8QWLS2UXcPRabENHUsHshNZE",
  authDomain: "twotter-1704e.firebaseapp.com",
  projectId: "twotter-1704e",
  storageBucket: "twotter-1704e.appspot.com",
  messagingSenderId: "91700131794",
  appId: "1:91700131794:web:6b3a6d278e0ef4879f7a0b",
  measurementId: "G-1H3VLHK251",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
