import { initializeApp } from 'firebase/app';

const firebaseConfig = {

  apiKey: process.env.API_KEY,

  authDomain: "skillshare2-b93bc.firebaseapp.com",

  databaseURL: "https://skillshare2-b93bc-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "skillshare2-b93bc",

  storageBucket: "skillshare2-b93bc.appspot.com",

  messagingSenderId: "342839274752",

  appId: "1:342839274752:web:90a352a77e60848e7317e5"

};
  
  const app = initializeApp(firebaseConfig);

  export default app;
