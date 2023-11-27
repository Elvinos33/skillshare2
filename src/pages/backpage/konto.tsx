import { logout } from "@/auth/firebaseAuth";
import { useRouter } from "next/router";

export default function Konto() {
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
  return (
    <>
      <main className="w-screen h-screen bg-background flex">
        <div className="w-1/5 bg-primary pt-8">
          <button className="w-full flex flex-start py-4 pl-4 bg-background font-semibold text-primary">
            Din Konto
          </button>
          <a href="/backpage/logg" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">
            Logg
          </a>
          <a href="/backpage/dinekurs" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">
            Dine Kurs
          </a>
          <div className="h-[24rem]"></div>
          <a href="/" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">
            Tilbake
          </a>
          <button onClick={handleLogout} className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">
            Logg ut
          </button>
        </div>
        <div className="w-4/5"></div>
      </main>
    </>
  );
}
