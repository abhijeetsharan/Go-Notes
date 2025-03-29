import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-400 p-4 shadow-md">
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-black text-xl font-bold">
          Go Notes
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-black font-medium">Welcome, {user?.name}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700 ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-black font-medium hover:underline">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-700 ml-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
