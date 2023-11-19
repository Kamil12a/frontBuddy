import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

// Function to create a user
export async function createUser(email, password, fields, img) {
  createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      createDocument("Users", user.uid, fields);
      if (img !== undefined) {
        uploadFileToStorage(`profileImage/${user.uid}`, img);
      }
    }
  );
}

// ... (Your existing functions)

// Function to upload a file to Firebase Storage
export async function uploadFileToStorage(filePath, file) {
  const storageRef = ref(storage, filePath);

  try {
    await uploadBytes(storageRef, file);
    console.log("File successfully uploaded to Firebase Storage");
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    throw error;
  }
}

// Function to get the download URL of a file from Firebase Storage
export async function getFileDownloadURL(filePath) {
  const storageRef = ref(storage, filePath);

  try {
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw error;
  }
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
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
export async function fetchGroups() {
  const groupsRef = collection(firestore, "Groups");
  const querySnapshot = await getDocs(groupsRef);

  const groups = [];
  querySnapshot.forEach((doc) => {
    const groupData = doc.data();
    const groupId = doc.id; // Pobierz ID dokumentu
    groups.push({ id: groupId, ...groupData }); // Dodaj ID do danych grupy
  });

  return groups;
}
export async function fetchCollDocParams(collId, docId) {
  const userDocRef = doc(firestore, collId, docId);

  try {
    const docSnapshot = await getDoc(userDocRef);
    if (docSnapshot.exists()) {
      const docParams = docSnapshot.data();
      return docParams; // Dodano return, aby zwrócić dane dokumentu
    } else {
      console.log("Dokument o podanym ID nie istnieje.");
    }
  } catch (error) {
    console.error("Błąd podczas pobierania dokumentu:", error);
  }
}
export async function addUserToGroup(collId, docId, userId) {
  try {
    const userDocRef = doc(firestore, collId, docId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const docData = userDoc.data();
      if (!docData.users) {
        docData.users = []; // Jeśli nie ma tablicy users, utwórz ją
      }

      if (!docData.users.includes(userId)) {
        docData.users.push(userId); // Dodaj użytkownika do tablicy
        await updateDoc(userDocRef, docData); // Zaktualizuj dokument
        return true; // Zwróć true w przypadku sukcesu
      } else {
        console.log("Użytkownik jest już członkiem grupy.");
        return false; // Zwróć false, gdy użytkownik jest już członkiem grupy
      }
    } else {
      console.log("Dokument o podanym ID nie istnieje.");
      return false; // Zwróć false w przypadku braku dokumentu
    }
  } catch (error) {
    console.error("Błąd podczas dodawania użytkownika do grupy:", error);
    throw error; // Rzucanie błędem w przypadku wystąpienia problemu
  }
}
export async function addMessageToGroup(collId, docId, message) {
  try {
    const groupDocRef = doc(firestore, collId, docId);
    const groupDoc = await getDoc(groupDocRef);

    if (groupDoc.exists()) {
      const docData = groupDoc.data();
      if (!docData.messages) {
        docData.messages = []; // Jeśli nie ma tablicy messages, utwórz ją
      }

      // Dodaj nową wiadomość do tablicy
      docData.messages.push(message);

      await updateDoc(groupDocRef, docData); // Zaktualizuj dokument

      return true; // Zwróć true w przypadku sukcesu
    } else {
      console.log("Dokument o podanym ID nie istnieje.");
      return false; // Zwróć false w przypadku braku dokumentu
    }
  } catch (error) {
    console.error("Błąd podczas dodawania wiadomości do grupy:", error);
    throw error; // Rzucanie błędem w przypadku wystąpienia problemu
  }
}

export function startListeningToGroupChanges(col, groupId, callback) {
  const groupDocRef = doc(firestore, col, groupId);

  const unsubscribe = onSnapshot(groupDocRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data);
    } else {
      // Dokument został usunięty
      callback(null);
    }
  });

  return unsubscribe;
}
