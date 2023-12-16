// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
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
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        let loggedInUser;
        let storedUser
        if (querySnapshot) {
            loggedInUser = querySnapshot.docs[0].data();
            storedUser = { ...user };
            storedUser.type = loggedInUser.type;
            localStorage.setItem("user", JSON.stringify(storedUser));
        }
        else localStorage.setItem("user", JSON.stringify(user));

        // user.type = loggedInUser.type;
        // console.log(user)
        setError(null)
        return user;
    }
    catch (error) {
        setError(error.message || error);
    }
}

export const updateUser = async (updatedUserData) => {
    const user = await updateProfile(auth.currentUser, updatedUserData);
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
                    type: "0"
                };
            }
            else if (userType === "1") {
                reqBody = {
                    id: user.uid,
                    email: user.email,
                    username: username || "user",
                    createdAt: user.metadata.creationTime || "",
                    // restaurantData: { ...restaurantData },
                    restaurantId: user.uid,
                    type: "1"
                };
            }
            // await setDoc(usersRef, reqBody);

            try {
                await setDoc(doc(db, "users", user.uid), { ...reqBody });
                await updateUser({ displayName: username });
                const day = new Date(); // today
                day.setDate(day.getDate() + 1); // tomorrow
                const futureDate = new Date();
                futureDate.setDate(day.getDate() + 30); // Get the date 30 days later
                restaurantData.capacityInfo = {};
                while (day <= futureDate) {
                    const formattedDate = day.toISOString().split('T')[0];
                    restaurantData.capacityInfo[formattedDate] = {
                        '10-12': Number(restaurantData.capacity),
                        '12-14': Number(restaurantData.capacity),
                        '14-16': Number(restaurantData.capacity),
                        '16-18': Number(restaurantData.capacity),
                        '18-20': Number(restaurantData.capacity),
                        '20-22': Number(restaurantData.capacity),
                        '22-0': Number(restaurantData.capacity)
                    };
                    day.setDate(day.getDate() + 1); // Move to the next day
                }

                await setDoc(doc(db, "restaurants", user.uid), { id: user.uid, ...restaurantData });

                // console.log(updatedUser)
            }
            catch (error) {
                console.log(error)
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