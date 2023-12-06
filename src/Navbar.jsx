import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4 top-0 left-0 w-full fixed z-10">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo or Brand */}

          <Link
            to="/"
            className="text-white text-lg font-bold hover:text-gray-300"
          >
            Sam's Quizzes
          </Link>

          {/* Navigation Links */}
          <div className="space-x-4">
            <Link to="/leaderboards" className="text-white hover:text-gray-300">
              Leaderboards
            </Link>
          </div>
        </div>
      </nav>
      <div></div>
    </>
  );
};

export default Navbar;
