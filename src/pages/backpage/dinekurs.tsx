import Link from "next/link"

export default function DineKurs() {
    return (
        <>
            <main className="w-screen h-screen bg-background flex">
                <div className="w-1/5 bg-primary pt-8">
                    <Link href="/backpage/konto" className="w-full flex flex-start py-4 pl-4 hover:bg-background font-semibold text-background hover:text-primary">Din Konto</Link>
                    <Link href="/backpage/logg" className="w-full flex flex-start py-4 pl-4 hover:bg-background font-semibold text-background hover:text-primary">Logg</Link>
                    <button className="w-full flex flex-start py-4 pl-4 bg-background font-semibold text-primary">Dine Kurs</button>
                    <Link href="/backpage/liktekurs" className="w-full flex flex-start py-4 pl-4 hover:bg-background font-semibold text-background hover:text-primary">Logg</Link>
                    <div className="h-[24rem]"></div>
                    <button className="w-full flex flex-start py-4 pl-4 hover:bg-background font-semibold text-background hover:text-primary">Tilbake</button>
                    <button className="w-full flex flex-start py-4 pl-4 hover:bg-background font-semibold text-background hover:text-primary">Logg ut</button>
                </div>
                <div className="w-4/5"></div>
            </main>
        </>
    )
}