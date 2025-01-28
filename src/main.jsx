import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </AuthProvider>
);
