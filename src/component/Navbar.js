import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="fixed inset-0 md:inset-x-0 md:top-0 md:bottom-auto md:bg-neutral">
      <div className="md:relative md:max-w-6xl mx-auto">
        <div className="navbar shadow-lg bg-neutral text-neutral-content z-20 relative">
          <Link to="/" className="flex-1 px-2 mx-2">
            <span className="text-lg font-bold">daisyUI</span>
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
          className={`absolute md:h-auto inset-x-0 md:left-auto top-0 md:bottom-0 h-0 bg-neutral md:bg-transparent duration-300 transition-all z-10 md:z-20 flex justify-center items-center text-white ${
            isOpen && 'h-screen'
          }`}
        >
          <div className="flex flex-col md:flex-row items-stretch w-full md:w-min">
            <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
              Home
            </Link>
            <Link to="/library" className="btn btn-ghost btn-sm rounded-btn">
              Library
            </Link>
            <Link to="/login" className="btn btn-ghost btn-sm rounded-btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
