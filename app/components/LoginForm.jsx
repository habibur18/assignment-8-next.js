"use client";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";

export default function LoginForm() {
  const { auth, setAuth } = useAuth();
  const [login, setLogin] = useState({});
  const [error, setError] = useState(null);
  const ref = React.useRef(null);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(login);

    const response = await fetch("/api/users/loginUser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    const data = await response.json();
    if (data.message) {
      setError(data.message);
    }
    if (data.accessToken) {
      setAuth(data);
      setError(null);
      ref.current.reset();
    }
  };
  return (
    <form className="login-form" onSubmit={handleSubmit} ref={ref}>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-[#eb4a36] py-3 rounded-md text-white w-full mt-4"
      >
        Login
      </button>
    </form>
  );
}
