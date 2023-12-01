import { useState, useEffect } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SearchIcon, FilterIcon, UserIcon , LogoutIcon} from '@heroicons/react/solid';

export default function Header({ toggleSidebar }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="h-[7rem] w-screen flex items-center shadow-md fixed bg-background">
      <div className="w-1/2 pl-8">
        <Link href={"/"} className="flex bg-background items-center">
          <img src="logo.png" height={200} width={200} />
        </Link>
      </div> 
      <div className="w-1/2 flex justify-end mr-4">
        <div className="relative">
          <input type="text" className="text-black rounded p-3 flex outline-none items-center border border-primary bg-background pr-8" placeholder="Søk..." />
          <SearchIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
        <button onClick={toggleSidebar} className="ml-8 py-2 w-[10rem] bg-primary rounded flex justify-center text-background font-semibold items-center hover:border hover:border-primary hover:bg-background hover:text-primary">
          <FilterIcon className="w-4 h-4 mr-2" /> Filter
        </button>
        
        {user ? (
          <Link href="/backpage/konto" className="ml-8 py-2 w-[10rem] bg-primary rounded flex justify-center text-background font-semibold items-center hover:border hover:border-primary hover:bg-background hover:text-primary">
            <UserIcon className="w-4 h-4 mr-2" /> Min Konto
          </Link>
        ) : (
          <Link href="/login" className="ml-8 py-2 w-[10rem] bg-primary rounded flex justify-center text-background font-semibold items-center hover:border hover:border-primary hover:bg-background hover:text-primary">
            <UserIcon className="w-4 h-4 mr-2" /> Logg inn
          </Link>
        )}
      </div>
    </main>
  );
}
