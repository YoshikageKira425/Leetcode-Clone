import { useLocalStorage } from '@uidotdev/usehooks';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {});
  const navigate = useNavigate();

  const logOut = () => {
    setCurrentUser({});
    alert('Logged out successfully!');
    navigate('/sign-up');
  }

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/" className='flex items-center space-x-2'>
              <img className=" w-auto h-6 sm:h-7" src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png" alt="Logo"/>
              <p className='text-white font-medium'>LeetCode</p>
            </Link>

            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="absolute inset-x-0 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              {
                currentUser.isAdmin == true && 
                  <Link to="/admin" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Admin</Link>
              }
              <button onClick={logOut} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Log Out</button>
            </div>

            <div className="flex items-center mt-4 lg:mt-0">
              <Link to="/account" type="button" className="flex items-center focus:outline-none">
                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                  <img src={currentUser.profilePhoto} className="object-cover w-full h-full" alt="avatar"/>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;