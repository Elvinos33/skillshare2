import Link from "next/link"

export default function Header() {
    return (
        <main className="h-[8rem] w-screen flex items-center bg-accent shadow-lg">
            <div className="w-1/2 pl-16 pr-40">
                <div className="flex bg-background">
                    <div className="mr-6 pl-6 py-2">Search</div>
                    <input type="text" className="outline-none pr-6 py-2 bg-background w-full" placeholder="Søk..." />
                </div>
            </div>
            <div className="w-1/2 flex justify-end mr-16">
                <Link href="/LoggInn" className="py-2 w-[10rem] bg-primary flex justify-center text-background font-semibold">Logg inn</Link>
                <button className="ml-8 py-2 w-[10rem] bg-primary flex justify-center text-background font-semibold">Filter</button>
            </div>
        </main>
    )
}