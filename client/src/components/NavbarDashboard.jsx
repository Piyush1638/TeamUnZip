import React from "react";
import { Link } from "react-router-dom";

const NavbarDashboard = () => {
  return (
      <nav className="bg-transparent">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl font-bold whitespace-nowrap text-white ">
              UnZip
            </span>
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:text-custompurple md:p-0 "
                  aria-current="page"
                >
                  DashBoard
                </Link>
              </li>
              <li>
                <Link
                  to="/clients"
                  className="block py-2 px-3 text-white  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                >
                  Client
                </Link>
              </li>
              <li>
                <Link
                  to="/cases"
                  className="block py-2 px-3 text-white  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                >
                  Cases
                </Link>
              </li>
              <li>
                <Link
                  to="/lawyers"
                  className="block py-2 px-3 text-white  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                >
                  Lawyer
                </Link>
              </li>
              <li>
                <Link
                  to="/judges"
                  className="block py-2 px-3 text-white  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Judge
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default NavbarDashboard;
