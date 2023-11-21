import Link from "next/link"

export default function Header() {
    return (
        <main className="h-[4rem] w-screen flex items-center shadow-md">
            <div className="w-1/2 pl-8">
                <div className="flex bg-background">
                    <input type="text" className="text-black brightness-95 rounded p-3 bg-background w-full" placeholder="Søk..." />
                </div>
            </div>
            <div className="w-1/2 flex justify-end mr-4">
                <Link href="/LoggInn" className="py-2 w-[10rem] bg-primary rounded flex justify-center text-background font-semibold">Logg inn</Link>
                <button className="ml-8 py-2 w-[10rem] bg-primary rounded flex justify-center text-background font-semibold">Filter</button>
            </div>
        </main>
    )
}
