import Header from '@/components/header'
import React, {useState, useEffect} from 'react';
import {getDatabase, ref, onValue} from 'firebase/database';
import app from "@/lib/firebaseConfig"
import Link from 'next/link';

export default function Home() {

  const [data, setData] = useState([]);
  const [isSidebarVisible, setSidebarVisibility] = useState(false);

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
  

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  return (
    <main className="w-screen h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <div className='w-full h-[80rem] overflow-y-auto pt-[4rem]'>
        <ul className='w-screen grid grid-cols-5 pt-16 px-16 overflow-y'>
          {data.map((item, index) => (
              <li key={index} className='w-full mb-3 px-2'>
                <div className='h-fit hover:bg-gray-100 transition rounded'>
                  <Link className='flex p-2 flex-col rounded border justify-end h-full w-full text-black' href={item.videofil}>
                    <img height={200}  className='rounded flex justify-center w-full max-h-200' src='Thumbnail.png'/>
                    <p className='p-2'>{item.tittel}</p>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
      </div>
      <div className={`fixed left-0 top-0 h-full w-1/5 bg-background transition-all duration-300 ease-in-out border-r border-primary p-2 px-8 pt-24 ${isSidebarVisible ? "ml-0" : "-ml-[40rem]"}`}>
        <div className='flex items-center justify-between mb-12'>
          <p className='text-primary font-semibold'>Sport</p>
          <input name="anmelding" type="checkbox" className='w-[2rem] h-[2rem]' />
        </div>
        <div className='flex items-center justify-between mb-12'>
          <p className='text-primary font-semibold'>Spill/Videospill</p>
          <input name="anmelding" type="checkbox" className='w-[2rem] h-[2rem]' />
        </div>
        <div className='flex items-center justify-between mb-12'>
          <p className='text-primary font-semibold'>Film/Video</p>
          <input name="anmelding" type="checkbox" className='w-[2rem] h-[2rem]' />
        </div>
        <div className='flex items-center justify-between mb-12'>
          <p className='text-primary font-semibold'>Skole/Fag</p>
          <input name="anmelding" type="checkbox" className='w-[2rem] h-[2rem]' />
        </div>
        <div className='flex items-center justify-between mb-12'>
          <p className='text-primary font-semibold'>Programmering</p>
          <input name="anmelding" type="checkbox" className='w-[2rem] h-[2rem]' />
        </div>
        <div className='flex items-center justify-between mb-12'>
          <p className='text-primary font-semibold'>Utforsk</p>
          <input name="anmelding" type="checkbox" className='w-[2rem] h-[2rem]' />
        </div>
        <button className='className="w-[10rem] ml-2 px-8 py-4 mt-[10rem] bg-primary rounded flex justify-center text-background font-semibold items-center hover:border hover:border-primary hover:bg-background hover:text-primary' onClick={toggleSidebar}>Lukk Filter Meny</button>
      </div>
    </main>
  )
}
