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
      <div className='w-full h-[42rem] overflow-y-auto'>
        <ul className='w-screen min-h-[50rem] grid grid-cols-5 pt-16 px-16 overflow-y'>
          {data.map((item, index) => (
              <li key={index} className='w-full h-[6rem] px-2'>
                <div className='border-primary border h-[14rem] p-2 rounded-lg'>
                  {item.navn}
                </div>
              </li>
            ))}
          </ul>
      </div>
    </main>
  )
}
