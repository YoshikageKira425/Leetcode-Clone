import { useLocalStorage, useRenderCount } from '@uidotdev/usehooks';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import data from "../data.json"

function ProblemCardAdmin({ id, title, difficulty, completedAmount }) {
    const [problems, setProblems] = useLocalStorage("problems", JSON.parse(JSON.stringify(data)));

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
    }[difficulty] || 'text-emerald-500';

    const navigate = useNavigate();

    const OpenProblem = () => 
    {
        navigate(`/problem/${id}`);
    }

    const removeElement = (e) => 
    {
        e.stopPropagation();
        setProblems(prev =>
        prev.filter(problem => problem.id !== id)
            .map(problem =>
            problem.id < id ? problem : { ...problem, id: problem.id - 1 }
            )
        );

        setCurrentUser(prev =>({...prev, problemsSolved: prev.problemsSolved.filter(problem => problem.id !== id)}));
        setUsers(prev => 
            prev.map(user => ({
                ...user,
                problemsSolved: user.problemsSolved.filter(problem => problem.id !== id)
            }))
        );
    }

    const openEditor = (e) =>
    {
        e.stopPropagation();
        navigate(`/problem/${id}/editor`);
    }

    return (
        <tr onClick={() => OpenProblem()} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                <h2 className="font-medium text-gray-800 dark:text-white">{title}</h2>
            </td>
            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                <div className={`inline px-3 py-1 text-sm ${difficultyColor} font-normal rounded-full gap-x-2 bg-gray-100 dark:bg-gray-800`}>
                    {difficulty}
                </div>
            </td>
            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                <div className="inline px-3 py-1 text-sm text-gray-400 font-normal rounded-full gap-x-2 bg-gray-100 dark:bg-gray-800">
                    {completedAmount} Solved
                </div>
            </td>
            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                <button onClick={(e) => removeElement(e)} className="bg-red-600 hover:bg-red-800 p-1 pr-2 pl-2 rounded-full">Remove</button>
            </td>
            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                <button onClick={(e) => openEditor(e)} className="bg-blue-600 hover:bg-blue-800 p-1 pr-2 pl-2 rounded-full">Edit</button>
            </td>
        </tr>
    );
}

export default ProblemCardAdmin;
