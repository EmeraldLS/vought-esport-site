import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaTrophy, FaUserPlus, FaUsers } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const path = "/tournament";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <nav
      className={` w-full z-20 py-3 transition-all duration-300 bg-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="font-bold text-xl transition-colors hover:text-black"
            >
              Vought Esports
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : " hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  {item.icon}
                  {item.text}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setNav(!nav)}
              className="inline-flex items-center justify-center p-2 rounded-md  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive ? "bg-gray-900 text-white" : " hover:bg-gray-700 "
                  }`
                }
              >
                {item.icon}
                {item.text}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
