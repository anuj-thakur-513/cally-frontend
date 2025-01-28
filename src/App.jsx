import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

const Auth = lazy(() => import("./pages/auth/Auth"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
