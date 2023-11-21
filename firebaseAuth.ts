import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth()

function createUser(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then ((userCredential) => {
      const user = userCredential.user;
      return user
    })
    .catch((error) => {
      return error.message
    })
}
