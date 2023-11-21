import Link from "next/link"

export default function Logg() {
    return (
        <>
            <main className="w-screen h-screen bg-background flex">
                <div className="w-1/5 bg-primary pt-8">
                    <Link href="/backpage/konto" className="w-full flex flex-start py-4 pl-4 hover:bg-background font-semibold text-background hover:text-primary">Din Konto</Link>
                    <button className="w-full flex flex-start py-4 pl-4 bg-background font-semibold text-primary">Logg</button>
                    <Link href="/backpage/dinekurs" className="w-full flex flex-start py-4 pl-4 hover:bg-background font-semibold text-background hover:text-primary">Dine Kurs</Link>
                    <Link href="/backpage/liktekurs" className="w-full flex flex-start py-4 pl-4 hover:bg-background font-semibold text-background hover:text-primary">Likte Kurs</Link>
                    <div className="h-[24rem]"></div>
                    <button className="w-full flex flex-start py-4 pl-4 hover:bg-background font-semibold text-background hover:text-primary">Tilbake</button>
                    <button className="w-full flex flex-start py-4 pl-4 hover:bg-background font-semibold text-background hover:text-primary">Logg ut</button>
                </div>
                <div className="w-4/5"></div>
            </main>
        </>
    )
}