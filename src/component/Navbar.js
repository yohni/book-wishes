import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, wallet } = useAuthContext();

  const handleLogout = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const closeNavs = () => setIsOpen(false);

  return (
    <div className="fixed inset-0 md:inset-x-0 md:top-0 md:bottom-auto md:bg-neutral pointer-events-none z-20">
      <div className="navbar shadow-lg bg-neutral text-neutral-content z-20 relative pointer-events-auto">
        <Link to="/" className="flex-1 px-2 mx-2">
          <div className="flex items-center">
            <span className="text-lg font-bold bg-bookwishes p-2 rounded-md">
              BW
            </span>
            <span className="font-bold text-lg ml-2">Book Wish</span>
          </div>
        </Link>

        <div className="flex-none md:hidden">
          <button
            type="button"
            className="btn btn-square btn-ghost"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`absolute md:h-auto inset-x-0 md:left-auto top-0 md:bottom-0 h-0 bg-neutral md:bg-transparent duration-300 transition-all z-10 md:z-20 flex justify-center items-center text-white md:mr-2 md:pr-2 pointer-events-auto ${
          isOpen && 'h-screen'
        }`}
      >
        <div className="flex flex-col md:flex-row items-stretch w-full md:w-min">
          <Link
            to="/"
            onClick={closeNavs}
            className="btn btn-ghost btn-sm rounded-btn hover-effect"
          >
            Home
          </Link>
          <Link
            to="/library"
            onClick={closeNavs}
            className="btn btn-ghost btn-sm rounded-btn hover-effect"
          >
            Library
          </Link>
          {!currentUser && (
            <Link
              to="/login"
              onClick={closeNavs}
              className="btn btn-ghost btn-sm rounded-btn hover-effect"
            >
              Login
            </Link>
          )}
          {currentUser && (
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-sm text-red-600 rounded-btn md:border md:border-red-600 md:border-solid md:rounded-full hover:bg-red-600 hover:text-white md:px-4 hover-effect"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
