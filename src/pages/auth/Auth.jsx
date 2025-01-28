import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";

const Auth = () => {
  const handleLogin = async (googleData) => {
    try {
      // Send the Google credential to the backend for verification and token generation
      const res = await axios.post("/api/v1/user/googleAuth", {
        credential: googleData.credential,
      });

      if (res?.data?.data) {
        window.location.href = res.data.data;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const redirectAuth = async (code) => {
    try {
      const res = await axios.post(`/api/v1/user/googleRedirect?code=${code}`);
      if (res.data?.data && res.status === 200) {
        window.location.href = "/";
        const user = res.data.data?.user;
        window.localStorage.setItem("userProfile", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("code")) {
      const code = params.get("code");
      redirectAuth(code);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <img
                  src="./cally.png"
                  alt="Cally Logo"
                  className="mx-auto mb-4 w-48 h-48 object-contain"
                />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  The better way to schedule your meetings
                </h2>
                <p className="text-gray-600 mb-6">
                  A fully customizable scheduling experience for individuals, businesses taking
                  calls, and developers building scheduling platforms where users meet users.
                </p>
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleLogin}
                    onError={() => console.error("Login Failed")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;
