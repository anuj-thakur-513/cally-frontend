import axios from "axios";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const AuthProvider = ({ children }) => {
  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/v1/user/isAuthenticated");
      if (res.status === 200) {
        if (window.location.pathname === "/auth") {
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.log(error.message);
      window.localStorage.removeItem("userProfile");
      if (window.location.pathname !== "/auth") {
        window.location.href = "/auth";
      }
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
