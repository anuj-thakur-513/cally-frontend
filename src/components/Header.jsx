import { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showToggle, setShowToggle] = useState(false);

  const logout = async () => {
    try {
      const res = await axios.post("/api/v1/user/logout");
      if (res.status === 200) {
        window.location.href = "/auth";
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem("userProfile"));
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="flex px-4 py-3">
        <p
          className="text-2xl font-bold cursor-pointer"
          onClick={() => {
            if (window.location.pathname !== "/") {
              window.location.href = "/";
            }
          }}
        >
          Cally
        </p>
        {user && (
          <div className="ml-auto flex items-center relative">
            <img
              src={user?.profilePicture || "/avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowToggle(!showToggle)}
            />
            {showToggle && (
              <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md hover:bg-red-400 transition-all duration-200 shadow-lg z-10">
                <button
                  className="w-full px-4 py-2 text-left text-gray-700 hover:text-gray-900 flex items-center cursor-pointer"
                  onClick={logout}
                >
                  <HiOutlineLogout className="pr-1 text-2xl" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
