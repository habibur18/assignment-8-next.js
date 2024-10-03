"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShareAndFavourite({ _id }) {
  const { auth } = useAuth();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch user's liked status for the current item
  useEffect(() => {
    const checkLike = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/users/favourites/${auth?.email}`
        );
        const data = await res.json();
        console.log("from check like", data);
        if (data.includes(_id)) {
          setLiked(true);
        }
      } catch (error) {
        console.error("Failed to fetch favorite status:", error);
      }
    };

    if (auth?.email) {
      checkLike();
    }
  }, [_id, auth?.email]);

  // Handle like/favorite toggle
  const handleToggleLike = async () => {
    if (loading) return;

    setLoading(true);
    setLiked((prev) => !prev); // Optimistically update UI

    try {
      const res = await fetch(
        `http://localhost:3000/api/favourites/${auth?.email}/${_id}`,
        { method: "PATCH" }
      );
      const data = await res.json();
      console.log(data); // Log the response or handle the result as needed
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setLiked((prev) => !prev); // Revert UI state if the request fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 justify-end">
      <div
        onClick={() => {
          if (!auth?.email) {
            router.push("/login");
          } else {
            handleToggleLike();
          }
        }}
        className={`flex gap-2 text-gray-600 cursor-pointer ${
          liked ? "hover:text-[#eb4a36]" : "hover:text-gray-800"
        }`}
      >
        {liked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="red"
            stroke="red"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-heart"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-heart"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
        )}
        <span>Favourite</span>
      </div>
      <div className="flex gap-2 text-gray-600 cursor-pointer hover:text-[#0E79F6]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M8.7 10.7l6.6 -3.4" />
          <path d="M8.7 13.3l6.6 3.4" />
        </svg>
        <span>Share</span>
      </div>
    </div>
  );
}
