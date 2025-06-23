import Link from "next/link";

export default function CageLayout({ children }) {
  return (
    <div>
        <Link href="/meghlokh" className="hover:underline flex items-center justify-center w-full">
          Home
        </Link>
        {children}
    </div>
  );
}