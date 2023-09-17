import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,

} from "firebase/firestore";

// Your Firebase configuration code (already provided by you)

const firebaseConfig = {
  apiKey: "AIzaSyBQ5_pC1iayewfvFVF_FeNYLv2BXHWunss",
  authDomain: "studybuddy-72da2.firebaseapp.com",
  projectId: "studybuddy-72da2",
  storageBucket: "studybuddy-72da2.appspot.com",
  messagingSenderId: "990393478041",
  appId: "1:990393478041:web:6cd6d428c0ad738973c108",
  measurementId: "G-14GPXB8GSC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Function to create a user
export async function createUser(email, password, fields) {
  createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      createDocument("Users", user.uid, fields);
    }
  );
}

export async function createCollectionAndAddDocument(collectionName, fields) {
  addDoc(collection(firestore, collectionName), {
    fields,
  });
}
export async function createDocument(collection, document, fields) {
  const userDocRef = doc(firestore, collection, document);
  await setDoc(userDocRef, fields);
}
export async function signUserIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Zalogowano użytkownika:", user.uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Błąd logowania:", errorCode, errorMessage);
    });
}
