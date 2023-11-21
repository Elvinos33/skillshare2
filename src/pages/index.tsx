import Header from '@/components/header'
import React, {useState, useEffect} from 'react';
import {getDatabase, ref, onValue} from 'firebase/database';
import app from "@/lib/firebaseConfig"

export default function Home() {

  const [data, setData] = useState([]);

  useEffect(() => {
      const db = getDatabase(app);
      const dataRef = ref(db, 'Kurs');

      onValue(dataRef, (snapshot) => {
      const dataFromFirebase = snapshot.val();

      if (dataFromFirebase) {
          const dataArray = Object.values(dataFromFirebase);
          setData(dataArray);
      }
      });

      return () => {
      onValue(dataRef, () => {});
      };
  }, []);

  return (
    <main className="w-screen h-screen bg-background">
      <Header/>
      <div className='px-16 w-full h-flex h-[42rem] overflow-y-auto p-2'>
        <ul className=''>
          {data.map((item, index) => (
              <li key={index} className=''>
                {item.navn}
              </li>
            ))}
          </ul>
      </div>
    </main>
  )
}
