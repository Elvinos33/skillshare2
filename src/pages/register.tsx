import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { createUser } from "@/auth/firebaseAuth";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      setEmailError(""); 
    } else if (name === "password") {
      setPassword(value);
      setPasswordError("");
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      setConfirmPasswordError(""); 
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Skriv inn epost adresse");
      return;
    }

    if (!password) {
      setPasswordError("Skriv inn et passord");
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Bekreft passordet ditt");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passordene er ikke like");
      return;
    }

    try {
      const user = await createUser(email, password);
      router.push("/backpage/konto");
    } catch (error) {
      setErrorMessage(error as string);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-[40%] px-8 py-12 rounded-md shadow-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register deg på Skillshare2</h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Epost</label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder=" user@email.com"
                />
              </div>
              {emailError && <div className="text-red-500 mt-2">{emailError}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Passord</label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder=" password123"
                />
              </div>
              {passwordError && <div className="text-red-500 mt-2">{passwordError}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Bekreft passord</label>
              <div className="mt-2">
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder=" password123"
                />
              </div>
              {confirmPasswordError && <div className="text-red-500 mt-2">{confirmPasswordError}</div>}
            </div>
  
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrer deg
              </button>
            </div>
  
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
          </form>
  
          <p className="mt-10 text-center text-sm text-gray-500">
            Har du allerede en bruker?
            <Link href="/login" className="font-semibold leading-6 text-primary hover:text-secondary"> Logg inn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
