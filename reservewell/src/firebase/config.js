// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
const db = getFirestore(firebaseApp);



export const signin = async (email, password, setError) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user", JSON.stringify(user));
        setError(null)
        return user;
    }
    catch (error) {
        setError(error.message || error);
    }
}

export const updateUser = async (updatedUserData) => {
    await updateProfile(auth.currentUser, updatedUserData)
}



export const signup = async (email, password, username, userType, setError, restaurantData) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        if (user) {
            // const usersRef = doc(usersCollectionRef);
            let reqBody = {};
            if (userType === "0") {
                reqBody = {
                    id: user.uid,
                    email: user.email,
                    username: username || "user",
                    reservationCounter: 0,
                    createdAt: user.metadata.creationTime || "",
                };
            }
            else if (userType === "1") {
                reqBody = {
                    id: user.uid,
                    email: user.email,
                    username: username || "user",
                    createdAt: user.metadata.creationTime || "",
                    restaurantData: { ...restaurantData },
                    restaurantId: user.uid,
                };
            }
            // await setDoc(usersRef, reqBody);

            try {
                await setDoc(doc(db, "users", user.uid), reqBody);
                const updatedUser = await updateUser({ displayName: username });
                console.log(updatedUser)
            }
            catch (error) {
                setError(error.message || error)
            }

            //   router.push("/login");
        }
        return user;
    }
    catch (error) {
        setError(error.message);
        return error;
    }
}

export const signout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
}

export default db;