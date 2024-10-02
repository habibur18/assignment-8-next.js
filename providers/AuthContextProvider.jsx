"use client";
import { AuthContext } from "@/context";
import { useState } from "react";

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
