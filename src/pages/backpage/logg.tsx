import Link from "next/link"
import { logout } from "@/auth/firebaseAuth";
import { useRouter } from "next/router";

export default function Logg() {
    const router = useRouter();

    const handleLogout = async () => {
      try {
        await logout(router);
        console.log("User logged out successfully");
        router.push("/");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    const noLogDeleteAlert = () => {
      alert("Denne funksjonen er kke laget enda.");
    }
    return (
        <>
            <main className="w-screen h-screen bg-background flex">
                <div className="w-1/5 bg-primary pt-8">
                    <Link href="/backpage/konto" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Din Konto</Link>
                    <button className="w-full flex flex-start py-4 pl-4 bg-background font-semibold text-primary">Logg</button>
                    <Link href="/backpage/dinekurs" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Dine Kurs</Link>
                    <div className="h-[24rem]"></div>
                    <button className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Tilbake</button>
                    <button onClick={handleLogout} className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Logg ut</button>
                </div>
                <div className="w-4/5 p-2 relative">
          <div className="h-[7rem] w-full flex items-center shadow-md">
            <div className="w-1/2 pl-8">
              <div className="flex bg-background text-2xl font-semibold">Logg</div>
            </div>
            <div className="w-1/2 flex justify-end mr-4">
              <input type="text" className="text-black rounded p-3 flex outline-none items-center border border-primary bg-background" placeholder="Søk..."/>
              <button onClick={noLogDeleteAlert} className="ml-8 py-2 w-[10rem] bg-primary rounded flex justify-center text-background font-semibold items-center hover:border hover:border-primary hover:bg-background hover:text-primary">Slett logg</button>
            </div>
          </div>
          <div className="mt-2 ml-4">
            Det er ingenting i loggen din...
          </div>
</div>

            </main>
        </>
    )
}