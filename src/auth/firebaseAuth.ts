import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import app from "@/lib/firebaseConfig";

const auth = getAuth(app);

export async function createUser(email: string, password: string): Promise<any> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error.message;
  }
}


export async function signIn(email: string, password: string): Promise<any> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error.message;
  }
}


