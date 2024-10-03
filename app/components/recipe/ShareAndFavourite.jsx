"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function ShareAndFavourite({ _id }) {
  const { auth } = useAuth();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [shareUrl, setShareUrl] = useState(""); // Initialize state for shareUrl
  const dropdownRef = useRef(null);

  // Set shareUrl after component mounts
  useEffect(() => {
    setShareUrl(`${window.location.origin}/recipe/${_id}`);
  }, [_id]);

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
      console.log(data);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setLiked((prev) => !prev); // Revert UI state if the request fails
    } finally {
      setLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div
        ref={dropdownRef}
        onClick={() => setActive((prev) => !prev)}
        className="relative flex gap-2 text-gray-600 cursor-pointer hover:text-[#0E79F6]"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${
            active ? "block" : "hidden"
          } absolute top-10 right-20 opacity-50 w-full h-full z-10 flex justify-center items-center gap-5`}
        >
          <EmailShareButton url={shareUrl}>
            <EmailIcon size={24} round />
          </EmailShareButton>

          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={24} round />
          </WhatsappShareButton>

          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={24} round />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={24} round />
          </TwitterShareButton>

          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={24} round />
          </LinkedinShareButton>

          <TelegramShareButton url={shareUrl}>
            <TelegramIcon size={24} round />
          </TelegramShareButton>

          <ViberShareButton url={shareUrl}>
            <ViberIcon size={24} round />
          </ViberShareButton>

          <LineShareButton url={shareUrl}>
            <LineIcon size={24} round />
          </LineShareButton>
        </div>
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
