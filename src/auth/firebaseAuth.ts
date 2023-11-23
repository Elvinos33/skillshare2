import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import app from "@/lib/firebaseConfig";

const auth = getAuth(app);

export function createUser(email: string, password: string): Promise<any> {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      throw error.message;
    });
}


export function signIn(email: string, password: string): Promise<any> {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user); // Resolve the Promise with the user
      })
      .catch((error) => {
        console.error("Firebase Auth Error:", error); // Log the entire error object
        reject(error); // Reject the Promise with the error object
      });
  });
}


