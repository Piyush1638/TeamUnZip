import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="">
      <nav className=" px-4 lg:px-6 py-2.5 bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              UnZip
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
