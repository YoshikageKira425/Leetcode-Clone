import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function LogIn() {
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {});
  const [users, setUsers] = useLocalStorage('users', [{
    "username": "Admin",
    "email": "admin425@gmail.com",
    "password": "123456",
    "profilePhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQApQMBIgACEQEDEQH/xAAbAAEAAwADAQAAAAAAAAAAAAAABQYHAgMEAf/EADkQAAICAQICBwUFBwUAAAAAAAABAgMEBREGQRIhIjFRYXGBkbLB0RNCU6GxFCQyM2KD4RVDUnKC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDUgAaZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHGco1xlOySjGPW5SeyRB5nFmn47caftMiS51pJe9gTwKrDjSnpdvBtSfNWJ/ImdO1vA1GShRd0bfw5raX+QJEDuAAAAAAAAAAAAAAAAAAAADrvurxqZ3XT6FcFvKXgjsKfxvnylOvT63tFLp2eb+782BEa5rV+q3NbuGNF9irx834six6AqB9Taaa6mutPwPgAuXC3EE75Rwc6bdvdVa/veT8y0mSxbjJSi9mnunv3GmaJnPUdNqyJfzNtrP8Asu/6kV7gAAAAAAAAAAAAAAAAAA9DMtctd+sZk3+NKK9E9l+hpq7zLtVj0NUzIvlfP4mB5QAaQAAAuHAVrdWZRyjKE17d18inlt4Bj2s6flBfEZVbgAAAAAAAAAAAAAAAAAA9TPeLcZ4+t2y27NyVi/R/mjQiG4n0l6nhKVK/eaXvD+pc4+0DPQfXFxbUk011NNdafgfCoAAKF84KxvsdKlbJdd1jkvRdS+ZUNJ027VMuNFSaj32T26oRNLpqhRVCmlKNcIqMV4JEHMAAAAAAAAAAAAAAAAAAAABE6vw/h6m3bLpU5D/3YLv9VzK5kcH58JP7G2m2Pjv0X7n9S7WWQqi5WzjBLnJ7I8Nuu6XU9p5tW/hF9L9AqoR4V1RvboVL+4iQwuDbG1LNyYxjv1wpW7ftf0JuPEekN7ftkV/5l9D1UapgZD2pzKZ78uns/cEc8LCx8ChU4larguvzb8W+Z6B+gCgACAAAAAAAAAAAAAAAR2t6vTpOP05rp3S/l179/n6AejOzcbBoduXaq4ct+9+i5lS1Li3JubhgR+wh3KcknP6Igs7Nyc+93ZVnTm+5dyj5Jcjzgdl992RNzvunbJ85ybOsAuIDb0AGD24Oq5+C/wB3yZqPOD7UX7GWnSuK6MiUas+Kos5TX8D+hSQCNaTUkpJ7p9zXM+lA0DiC7TpxpyG7MR8ucPNfQvlVkLq421SU65reMk+poiuYAAAAAAAAAAAADz6hmVYGHbk3Ps1rfb/k+SM01DNt1DLnk3vtSfUl3Jckid411B3ZkcKD7FHaltzk1v8AkitAAAVKAAoAAAAABYuEtY/ZMhYN8kqLZdhv7kn8mV0dfJkqxrYIvhvUP9R0uuc3vbX2LPFtc/dsShAAAAAAAAAOF1kaap2z/hri5P0RzIviW106HlyXfKKj73sBnd9s77rLrHvOyTm/a9zgAWJQAFAAAAAAAAAAEqxYuCcp1ajbjt9m+HUv6o9a/LcvJmWhWunWMOa/FS9/V8zTfEgAAAAAAAAEJxi9tCt25zh8QAGfgAsQABQAAAAAAAAAAHfgPbPxmvxofEjVACLAAEAAAf/Z",
    "problemsSolved": [],
    "isAdmin": true
  }]);
  const navigate = useNavigate();

  const handleLogin = (e) => 
  {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      setCurrentUser(user);
      alert('Login successful!');
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  }

  return (
    
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
              <img className="w-auto h-13" src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png" alt="" />
          </div>

          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

          <form onSubmit={handleLogin}>
              <div className="w-full mt-4">
                  <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" name='email'/>
              </div>

              <div className="w-full mt-4">
                  <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" name='password' />
              </div>

              <div className="flex items-center justify-between mt-4">
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>

                  <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign In
                  </button>
              </div>
          </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

          <Link to="/sign-up" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</Link>
      </div>
  </div>
    </div>
  )
}

export default LogIn