import Link from "next/link"

export default function Konto() {
    return (
        <>
            <main className="w-screen h-screen bg-background flex">
                <div className="w-1/5 bg-primary pt-8">
                    <button className="w-full flex flex-start py-4 pl-4 bg-background font-semibold text-primary">Din Konto</button>
                    <Link href="/backpage/logg" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Logg</Link>
                    <Link href="/backpage/dinekurs" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Dine Kurs</Link>
                    <Link href="/backpage/liktekurs" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Likte Kurs</Link>
                    <div className="h-[24rem]"></div>
                    <Link href="/" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Tilbake</Link>
                    <button className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary"><Link href="/">Logg ut</Link></button>
                </div>
                <div className="w-4/5"></div>
            </main>
        </>
    )
}