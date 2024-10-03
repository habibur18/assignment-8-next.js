"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function SinginOut() {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  return (
    <div>
      {auth?.email ? (
        <li className="py-2 bg-[green] px-6 rounded-md text-white content-center h-max">
          <button className="">{auth.firstName}</button>
        </li>
      ) : (
        <li className="py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center h-max">
          <Link href="/login">Login</Link>
        </li>
      )}
    </div>
  );
}
