// components/Navbar.jsx
// Displays navigation links, login/logout based on auth state

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl text-blue-600">HealthMonitor</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
