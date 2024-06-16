import Link from "next/link";
export default function Navbar() {
  return (
    <div className="w-auto h-20 flex items-center justify-center">
      <div className="flex flex-row space-x-16">
        <Link href="/feed">Feed</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}
