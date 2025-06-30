import React, { useEffect, useState } from 'react'
import NavBar from '../Component/NavBar'
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';

function Account() {
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {});
  const [solvedProblems, setSolvedProblems] = useState(JSON.parse(JSON.stringify(currentUser.problemsSolved)));
  const navigate = useNavigate();

  useEffect(() => 
    {
      if (Object.keys(currentUser).length === 0) {
        navigate('/sign-up');
    }
  }, [currentUser, navigate]);

  const formatTimeAgo = (dateString) =>
  {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  return (
    <>
        <NavBar />
        <div className='flex items-center justify-center mt-8 space-y-4'>
          <div className="grid grid-cols-4 grid-rows-5 gap-4 w-200">
            <div className="row-span-5 text-center">
              <div className="flex items-center justify-center flex-col mb-4">
                <img src={currentUser.profilePhoto} className="rounded-full w-27 h-27 mb-4" alt=""/>
                <span className="text-4xl pb-2 text-white">{currentUser.username}</span>
              </div>
              <Link to="/account/settings" className="px-6 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500">Account Settings</Link>
            </div>
            <div className="col-span-1">
                <div className='flex items-center justify-center flex-col gap-2 mt-2 bg-gray-800 p-4 rounded-lg'>
                  <div className='bg-gray-700 p-2 rounded-lg'>
                    <span className='text-2xl font-bold text-emerald-500'>Easy: </span> 
                    <span className='text-2xl text-white'>
                      {solvedProblems ? solvedProblems.filter(problem => problem.difficulty === 'Easy').length : 0}
                    </span>
                  </div>
                  <div className='bg-gray-700 p-2 rounded-lg'>
                    <span className='text-2xl font-bold text-yellow-500'>Medium: </span> 
                    <span className='text-2xl text-white'>
                      {solvedProblems ? solvedProblems.filter(problem => problem.difficulty === 'Medium').length : 0}
                    </span>
                  </div>
                  <div className='bg-gray-700 p-2 rounded-lg'>
                    <span className='text-2xl font-bold text-red-500'>Hard: </span> 
                    <span className='text-2xl text-white'>
                      {solvedProblems ? solvedProblems.filter(problem => problem.difficulty === 'Hard').length : 0}
                    </span>
                  </div>
                </div>
            </div>
            <div className="col-span-3 row-span-4 col-start-2 row-start-2 h-auto">
              <div className="shadow-md border-none rounded-lg">
                  <table className="table-fixed w-full text-left">
                    <tbody className="bg-gray-800 text-white">
                      {
                        solvedProblems.length > 0 ? (
                          solvedProblems.map((problem, index) => (
                            <tr key={index} className="border-b-black border-b-2">
                              <td className="px-4 py-2 bg-gray-700">{problem.title}</td>
                              <td className="px-4 py-2 bg-gray-800">{problem.difficulty}</td>
                              <td className="px-4 py-2 bg-gray-700">{formatTimeAgo(problem.dateSolved)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center px-4 py-2">No problems solved yet.</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Account