import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTrophy,
  FaUser,
  FaUserPlus,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { LoginButton } from "./login-button";
import { SignupButton } from "./signup-button";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const path = "/tournament";

  const { isAuthenticated, logout, user } = useAuth0();

  useEffect(() => {
    setNav(false);
  }, [location]);

  const navItems = [
    {
      to: `${path}/view`,
      text: "Tournaments",
      icon: <FaTrophy className="inline-block mr-2" />,
    },
    {
      to: `${path}/create`,
      text: "Create Tournament",
      icon: <FaTrophy className="inline-block mr-2" />,
    },
    {
      to: "/players/view",
      text: "Players",
      icon: <FaUsers className="inline-block mr-2" />,
    },
    {
      to: "/players/register",
      text: "Register Player",
      icon: <FaUserPlus className="inline-block mr-2" />,
    },
  ];

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="font-bold text-xl transition-colors hover:text-gray-300"
            >
              Vought Esports
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.text}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <LoginButton />
                <SignupButton />
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setNav(!nav)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={nav}
            >
              <span className="sr-only">Open main menu</span>
              {nav ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {nav && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
                onClick={() => setNav(false)}
              >
                {item.icon}
                {item.text}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={() => setNav(false)}
                >
                  <FaUser className="inline-block mr-2" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setNav(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <FaSignOutAlt className="inline-block mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-1 mt-2">
                <LoginButton />
                <SignupButton />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
