import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyA6IsVffM1qrVyGiUhSB6zvLJbGOFkiEYQ",
    authDomain: "skillshare2-b93bc.firebaseapp.com",
    projectId: "skillshare2-b93bc",
    storageBucket: "skillshare2-b93bc.appspot.com",
    messagingSenderId: "342839274752",
    appId: "1:342839274752:web:bab91578e3f2f3167317e5"
  };
  
  const app = initializeApp(firebaseConfig);

  export default app;