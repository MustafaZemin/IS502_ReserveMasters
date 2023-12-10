// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxHYXJHYsI8SZywa8xL-udKRkVFO6vAgE",
    authDomain: "reservewell.firebaseapp.com",
    projectId: "reservewell",
    storageBucket: "reservewell.appspot.com",
    messagingSenderId: "354252585642",
    appId: "1:354252585642:web:0e931d406bc16250702ed3",
    measurementId: "G-VQQX9K15FN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();

export const signup = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    // console.log(user)
    return user;
}

const db = getFirestore(firebaseApp);
export default db;