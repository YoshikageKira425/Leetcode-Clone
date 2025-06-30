import React, { use, useEffect, useState } from 'react';
import NavBar from '../Component/NavBar';
import data from "../data.json";
import { useParams, useNavigate, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { runCode } from './api';
import { useLocalStorage } from '@uidotdev/usehooks';

function Problem() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [problems, setProblems] = useLocalStorage("problems", JSON.parse(JSON.stringify(data)));
  const [problem, setProblem] = useState(problems.find(p => p.id === Number(id)) || {});

  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("Output / Console will go here");

  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {});
  const [users, setUsers] = useLocalStorage('users', [{
    "username": "Admin",
    "email": "admin425@gmail.com",
    "password": "123456",
    "profilePhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQApQMBIgACEQEDEQH/xAAbAAEAAwADAQAAAAAAAAAAAAAABQYHAgMEAf/EADkQAAICAQICBwUFBwUAAAAAAAABAgMEBREGQRIhIjFRYXGBkbLB0RNCU6GxFCQyM2KD4RVDUnKC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDUgAaZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHGco1xlOySjGPW5SeyRB5nFmn47caftMiS51pJe9gTwKrDjSnpdvBtSfNWJ/ImdO1vA1GShRd0bfw5raX+QJEDuAAAAAAAAAAAAAAAAAAAADrvurxqZ3XT6FcFvKXgjsKfxvnylOvT63tFLp2eb+782BEa5rV+q3NbuGNF9irx834six6AqB9Taaa6mutPwPgAuXC3EE75Rwc6bdvdVa/veT8y0mSxbjJSi9mnunv3GmaJnPUdNqyJfzNtrP8Asu/6kV7gAAAAAAAAAAAAAAAAAA9DMtctd+sZk3+NKK9E9l+hpq7zLtVj0NUzIvlfP4mB5QAaQAAAuHAVrdWZRyjKE17d18inlt4Bj2s6flBfEZVbgAAAAAAAAAAAAAAAAAA9TPeLcZ4+t2y27NyVi/R/mjQiG4n0l6nhKVK/eaXvD+pc4+0DPQfXFxbUk011NNdafgfCoAAKF84KxvsdKlbJdd1jkvRdS+ZUNJ027VMuNFSaj32T26oRNLpqhRVCmlKNcIqMV4JEHMAAAAAAAAAAAAAAAAAAAABE6vw/h6m3bLpU5D/3YLv9VzK5kcH58JP7G2m2Pjv0X7n9S7WWQqi5WzjBLnJ7I8Nuu6XU9p5tW/hF9L9AqoR4V1RvboVL+4iQwuDbG1LNyYxjv1wpW7ftf0JuPEekN7ftkV/5l9D1UapgZD2pzKZ78uns/cEc8LCx8ChU4larguvzb8W+Z6B+gCgACAAAAAAAAAAAAAAAR2t6vTpOP05rp3S/l179/n6AejOzcbBoduXaq4ct+9+i5lS1Li3JubhgR+wh3KcknP6Igs7Nyc+93ZVnTm+5dyj5Jcjzgdl992RNzvunbJ85ybOsAuIDb0AGD24Oq5+C/wB3yZqPOD7UX7GWnSuK6MiUas+Kos5TX8D+hSQCNaTUkpJ7p9zXM+lA0DiC7TpxpyG7MR8ucPNfQvlVkLq421SU65reMk+poiuYAAAAAAAAAAAADz6hmVYGHbk3Ps1rfb/k+SM01DNt1DLnk3vtSfUl3Jckid411B3ZkcKD7FHaltzk1v8AkitAAAVKAAoAAAAABYuEtY/ZMhYN8kqLZdhv7kn8mV0dfJkqxrYIvhvUP9R0uuc3vbX2LPFtc/dsShAAAAAAAAAOF1kaap2z/hri5P0RzIviW106HlyXfKKj73sBnd9s77rLrHvOyTm/a9zgAWJQAFAAAAAAAAAAEqxYuCcp1ajbjt9m+HUv6o9a/LcvJmWhWunWMOa/FS9/V8zTfEgAAAAAAAAEJxi9tCt25zh8QAGfgAsQABQAAAAAAAAAAHfgPbPxmvxofEjVACLAAEAAAf/Z",
    "problemsSolved": [],
    "isAdmin": true
  }]);

  const difficultyColor = {
    'Hard': 'text-red-500',
    'Medium': 'text-yellow-500',
    'Easy': 'text-emerald-500'
  }[problem.difficulty] || 'text-emerald-500';

  useEffect(() => 
  {
    if (Object.keys(currentUser).length === 0) {
      navigate('/sign-up');
    }

    console.log(Object.keys(problem).length === 0)
    if (Object.keys(problem).length === 0) {
      navigate("/not-found");
    }
  }, [currentUser, navigate, problem]);

  useEffect(() => {
    if (!problem) {
      navigate("/not-found");
    }
  }, [problem, navigate]);

  useEffect(() => {
    if (problem && Object.keys(problem).length > 0) {
      setCode(problem.default_code[language] || "");
    }
  }, [problem, language]);
  
  const normalize = val => {
    if (val == null) return '';
    if (typeof val === 'string') return val.replace(/\s/g, '');
    try {
      return JSON.stringify(val).replace(/\s/g, '');
    } catch {
      return '';
    }
  };

  useEffect(() => {
    const outputStripped = normalize(output);
    const correctStripped = normalize(problem.corrent_answer);

    if (outputStripped === correctStripped && currentUser.problemsSolved.filter(p => p.id === problem.id).length == 0)
    {
      const dateSolved = new Date();

      setCurrentUser(prev => ({ ...prev, problemsSolved: [...prev.problemsSolved, { ...problem, dateSolved }] }));
      setUsers(prev => prev.map(user => user.email === currentUser.email ? { ...user, problemsSolved: [...user.problemsSolved, { ...problem, dateSolved }] } : user));
      alert("Congratulations! You solved the problem.");
    }
  }, [output])

  const handleRun = async () => {
    try{
      const {run:result} = await runCode(language, code, problem.code_run[language] || "");
      if (result) {
        setOutput(result.output);
      } else {
        setOutput("No output returned from the code execution.");
      }
    }
    catch (error) {
      setOutput(error.message || " An error occurred while running the code.");
    }
  }

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-5 grid-rows-5 gap-4 p-4">
        <div className="col-span-2 row-span-5 overflow-auto">
          <h1 className="text-4xl font-bold mb-2 text-white">{problem.title}</h1>
          <div className={`inline px-3 py-1 text-lg ${difficultyColor} font-normal rounded-full gap-x-2 bg-gray-100 dark:bg-gray-800`}>
            {problem.difficulty}
          </div>
          <p className="mb-6 mt-4 whitespace-pre-line text-white">{problem.description}</p>
          {
            problem && Object.keys(problem).length > 0 && problem.test_cases.map((testCase, index) => (
              <div key={index} className="mb-4 p-3 border rounded-lg bg-gray-50">
                <h2 className="text-lg font-semibold mb-1">Test Case {index + 1}</h2>
                <p className="text-gray-700">
                  <strong>Input:</strong> {JSON.stringify(testCase.input)}
                </p>
                <p className="text-green-600">
                  <strong>Expected Output:</strong> {JSON.stringify(testCase.output)}
                </p>
              </div>
            ))
          }
        </div>

        <div className="col-span-3 row-span-4 col-start-3 ">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mb-4 p-2 border rounded w-48 self-start text-white">
            {problem && Object.keys(problem).length > 0 && Object.keys(problem.default_code).map(lang => (
              <option key={lang} value={lang} className='bg-gray-800 text-white'>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
          <button onClick={handleRun} className='ml-3 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Run</button>

          {
            currentUser.isAdmin &&
            <Link to={`/problem/${id}/editor`} className='ml-3 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80'>Edit</Link>
          }

          <Editor height="300px" language={language}  value={code} onChange={setCode} theme="vs-dark" options={{ fontSize: 16 }}/>

          <div className="p-4 mt-4 border rounded bg-gray-100">
            <p>{output}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Problem;