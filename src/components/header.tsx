import Link from "next/link"

export default function Header() {
    return (
        <main className="h-[7rem] w-screen flex items-center shadow-md">
            <div className="w-1/2 pl-8">
                <div className="flex bg-background">
                </div>
            </div>
            <div className="w-1/2 flex justify-end mr-4">
                <input type="text" className="text-black rounded p-3 flex outline-none items-center border border-primary bg-background" placeholder="Søk..." />
                <Link href="/LoggInn" className=" ml-8 py-2 w-[10rem] bg-primary rounded flex justify-center text-background font-semibold items-center hover:border hover:border-primary hover:bg-background hover:text-primary">Logg inn</Link>
                <button className="ml-8 py-2 w-[10rem] bg-primary rounded flex justify-center text-background font-semibold items-center hover:border hover:border-primary hover:bg-background hover:text-primary">Filter</button>
            </div>
        </main>
    )
}
