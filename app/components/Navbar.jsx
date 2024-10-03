import Image from "next/image";
import Link from "next/link";
import SinginOut from "./SinginOut";

export default function Navbar() {
  return (
    <nav>
      <div className="container flex justify-between py-6">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt=""
            className="object-cover h-[100px]"
            width={120}
            height={100}
          />
        </Link>

        <ul className="flex gap-4 text-sm text-gray-500">
          <li className="py-2 active">
            <Link href="/">Home</Link>
          </li>

          <li className="py-2">
            <Link href="/recipe">Recipe</Link>
          </li>

          <li className="py-2">
            <Link href="/about">About us</Link>
          </li>

          <SinginOut />
        </ul>
      </div>
    </nav>
  );
}
