import React, { use, useEffect, useState } from 'react'
import NavBar from '../Component/NavBar'
import ProblemCard from '../Component/ProblemCard'
import data from "../data.json";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';

function Home() {
  const [Data, setData] = useLocalStorage("problems", JSON.parse(JSON.stringify(data)));
  const [problems, setProblems] = useState(Data);

  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {});
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  useEffect(() => 
  {
    if (Object.keys(currentUser).length === 0) {
      navigate('/sign-up');
    }
  }, [currentUser, navigate]);

  useEffect(() => 
  {
    if (search.trim() === '') {
      setProblems(Data);
    } else {
      const filteredProblems = Data.filter(problem => 
        problem.title.toLowerCase().includes(search.toLowerCase())
      );
      setProblems(filteredProblems);
    }
  }, [search]);

  return (
    <>
        <NavBar />
        
        <div className="text-center mt-5">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-[59%] p-2 pl-5 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search" />
          
          <section className="container px-4 mx-auto">
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="py-3.5 px-4 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400">Problem</th>

                          <th scope="col" className="px-12 py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400">Diffcult</th>

                          <th scope="col" className="px-12 py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {
                          problems && problems.map((problem, index) => (
                            <ProblemCard 
                              key={index} 
                              id={problem.id}
                              title={problem.title} 
                              difficulty={problem.difficulty}
                              status={currentUser.problemsSolved && currentUser.problemsSolved.filter(p => p.id === problem.id).length > 0 } 
                            />
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
    </>
  )
}

export default Home