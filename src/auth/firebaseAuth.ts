import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "@/lib/firebaseConfig";
import { useRouter } from "next/router";

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




export async function logout(router): Promise<void> {
  const auth = getAuth(app);

  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.message;
  }
  if (typeof window !== "undefined") {
    router.push("/");
  }
}
