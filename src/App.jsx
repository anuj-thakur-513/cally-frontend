import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

const Auth = lazy(() => import("./pages/auth/Auth"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Scheduler = lazy(() => import("./pages/scheduler/Scheduler"));
const PrivacyPolicy = lazy(() => import("./pages/policy/PrivacyPolicy"));

function App() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/schedule/:userId" element={<Scheduler />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
