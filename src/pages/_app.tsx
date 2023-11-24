import '@/styles/globals.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (!user && router.pathname.startsWith("/backpage")) {
          router.push("/");
        }
      });
    };

    checkUser();
  }, [router.pathname]);

  return <Component {...pageProps} />;
}
