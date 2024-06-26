import Link from "next/link";
import { Home, BookmarkPlus } from "lucide-react";
export default function Navbar() {
  return (
    <header className="bg-white sticky top-0 w-full z-10">
      <div className="w-auto h-20 flex items-center justify-center">
        <div className="flex flex-row space-x-16">
          <Link href="/feed">
            <Home />
          </Link>
          <Link href="/dashboard">
            <BookmarkPlus />
          </Link>
        </div>
      </div>
    </header>
  );
}
