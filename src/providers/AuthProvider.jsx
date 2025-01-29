/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";
import { PUBLIC_ROUTES } from "../utils/constants";

const AuthProvider = ({ children }) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (PUBLIC_ROUTES.includes(location.pathname)) return;
        const res = await axios.get("/api/v1/user/isAuthenticated");
        if (res.status === 200) {
          if (window.location.pathname === "/auth") {
            window.location.href = "/";
          }
        }
      } catch (error) {
        console.log(error.message);
        window.localStorage.removeItem("userProfile");
        if (!PUBLIC_ROUTES.includes(location.pathname)) {
          window.location.href = "/auth";
        }
      }
    };
    checkAuth();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
