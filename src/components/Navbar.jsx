import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = (isActive) =>
    `block text-lg font-medium py-2 transition-colors duration-300 ${
      isActive ? "text-blue-500" : "text-gray-800"
    } hover:text-blue-400`;

  return (
    <nav className="font-primary bg-white/30 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between md:px-16 px-4 h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Cricket Insights logo" className="w-16 h-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
          <NavLink
            to="/home"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/player-stats"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            PLAYER
          </NavLink>
          <NavLink
            to="/players-comparison"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            COMPARE
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className="fixed top-0 right-0 w-64 h-screen bg-white shadow-lg z-50 transform animate-slideIn">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <NavLink
                to="/home"
                className={({ isActive }) => navLinkClass(isActive)}
                onClick={() => setIsOpen(false)}
              >
                HOME
              </NavLink>
              <NavLink
                to="/player-stats"
                className={({ isActive }) => navLinkClass(isActive)}
                onClick={() => setIsOpen(false)}
              >
                PLAYER
              </NavLink>
              <NavLink
                to="/players-comparison"
                className={({ isActive }) => navLinkClass(isActive)}
                onClick={() => setIsOpen(false)}
              >
                COMPARE
              </NavLink>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
