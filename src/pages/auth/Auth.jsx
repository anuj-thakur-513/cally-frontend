import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie";
import axios from "axios";

const Auth = () => {
  const AUTH_COOKIE_OPTIONS = {
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };

  const setAuthCookies = (accessToken) => {
    Cookies.set("accessToken", accessToken, AUTH_COOKIE_OPTIONS);
  };

  const handleLogin = async (googleData) => {
    try {
      const res = await axios.post("/api/v1/user/googleAuth", {
        credential: googleData.credential,
      });
      if (res?.data?.data) {
        const { accessToken } = res.data.data;
        setAuthCookies(accessToken);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
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
                A fully customizable scheduling experience for individuals, businesses taking calls
                and developers building scheduling platforms where users meet users.
              </p>
              <div className="flex justify-center">
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
                  <GoogleLogin
                    onSuccess={handleLogin}
                    onError={() => console.log("Login Failed")}
                  />
                </GoogleOAuthProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
