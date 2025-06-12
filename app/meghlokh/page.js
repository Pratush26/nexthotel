import Link from "next/link";

export default function Meghlokh(){
    return(
        <main className="flex flex-col justify-center items-center min-h-screen">
            dashboard
            <Link href={"/orders"}>Bookings</Link>
        </main>
    )
}