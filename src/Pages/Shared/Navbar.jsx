import React from 'react';
import { FaHashnode } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  // navbar links
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/joinEmployee"}>Join as Employee</NavLink>
      </li>
      <li>
        <NavLink to={"/joinHr"}>Join as HR Manager</NavLink>
      </li>
      <li>
        <NavLink
          className="btn btn-sm px-6 btn-outline text-white bg-[#2F4749] hover:bg-[#F7C99B] hover:text-black border-0"
          to={"/login"}
        >
          Login
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 w-[97%] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
                {links}
            </ul>
          </div>
          <NavLink to={'/'} className=" text-xl flex items-center gap-1  font-semibold ">
            <FaHashnode  className='text-[#F7C99B] size-7'/>
            <strong className='text-[#2F4749]'>AssetNode</strong>
          </NavLink>
        </div>
        <div className="navbar-end lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
              <div className="navbar-center hidden">
        </div>
      </div>
    </div>
  );
};

export default Navbar;