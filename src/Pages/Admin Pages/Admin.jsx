import React, { useEffect, useState } from 'react'
import NavBar from '../Component/NavBar'
import { useLocalStorage } from '@uidotdev/usehooks';
import { Link, useNavigate } from 'react-router-dom';
import ProblemCardAdmin from '../Component/ProblemCardAdmin';
import data from "../data.json";

function Admin() {
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
    const navigate = useNavigate();

    const [activeTestCase, setActiveTestCase] = useState(false);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [testCasesList, setTestCasesList] = useState([]);
    
    useEffect(() => 
    {
      if (Object.keys(currentUser).length === 0) {
        navigate('/sign-up');
      }

      if (!currentUser.isAdmin) {
          navigate('/');
      }
    }, [currentUser, navigate]);

    const countProblemsSolved = (problem) => 
    {
      const solvedCount = users.reduce((count, user) => {
          return count + user.problemsSolved.filter(p => p.id === problem.id).length;
      }, 0);
      return solvedCount;
    }

    const reset = () =>
    {
      setProblems(JSON.parse(JSON.stringify(data)));
    }

    const AddTestCase = () => 
    {
      if (input.trim() === "" || output.trim() === "") {
        alert("Input and Output cannot be empty");
        return;
      }

      setTestCasesList([...testCasesList, {input: JSON.parse(input), output: JSON.parse(output)}]);
      alert("Test case added successfully");
      setInput("");
      setOutput("");
      setActiveTestCase(false);
    }

    const removeTestCase = (index) =>
    {
      const updatedTestCases = testCasesList.filter((_, i) => i !== index);
      setTestCasesList(updatedTestCases);
      alert("Test case removed successfully");
    }

    const addProblem = (e) =>
    {
      e.preventDefault();
      const formData = new FormData(e.target);
      let code_run = {
        python: "",
        csharp: "",
        java: ""
      }

      let corrent_answer = "";
      
      for (let index = 0; index < testCasesList.length; index++) {
        const element = testCasesList[index];
        let input = JSON.stringify(element.input);

        corrent_answer += `Test Case ${index + 1} ${JSON.stringify(element.output)}\n`;

        if (typeof element.input !== 'object') 
        {
          code_run.python += `print("Test Case ${index + 1}", ${formData.get('method')}(${input})\n `;

          if (formData.get('methodType') !== "array") 
          {
            code_run.csharp += `Console.WriteLine("Test Case ${index + 1} " + ${formData.get('method')}(${input}));\n `;
            code_run.java += `System.out.println("Test Case ${index + 1} " + ${formData.get('method')}(${input}));\n `;
          }
          else
          {
            code_run.csharp += `Console.WriteLine("Test Case ${index + 1} [" + string.Join(", ", ${formData.get('method')}(${input})) + "]");\n `;
            code_run.java += `System.out.println("Test Case ${index + 1} " + Arrays.toString(${formData.get('method')}(${input})));\n `;
          }
        }
        else
        {
          code_run.python += `print("Test Case ${index + 1} " + ${formData.get('method')}(`;
          if (formData.get('methodType') !== "array") 
          {
            code_run.csharp += `Console.WriteLine("Test Case ${index + 1} " + ${formData.get('method')}(`;
            code_run.java += `System.out.println("Test Case ${index + 1} " + ${formData.get('method')}(`;
          }
          else
          {
            code_run.csharp += `Console.WriteLine("Test Case ${index + 1} [" + string.Join(", ", ${formData.get('method')}(`;
            code_run.java += `System.out.println("Test Case ${index + 1} " + Arrays.toString(${formData.get('method')}(`;
          }

          for (const value of Object.values(element.input)) {
            code_run.python += `${JSON.stringify(value)}, `;
            code_run.csharp += `${JSON.stringify(value)}, `;
            code_run.java += `${JSON.stringify(value)}, `;
          }

          code_run.python = code_run.python.slice(0, -2) + "))\n ";
          if (formData.get('methodType') !== "array") 
          {
            code_run.csharp = code_run.csharp.slice(0, -2) + "));\n ";
            code_run.java = code_run.java.slice(0, -2) + "));\n ";
          }
          else
          {
            code_run.csharp = code_run.csharp.slice(0, -2) + ` + "]");\n `;
            code_run.java = code_run.java.slice(0, -2) + ")));\n ";
          }
        }
      }

      const newProblem = {
          id: problems.length + 1,
          title: formData.get('title'),
          description: formData.get('desciption'),
          difficulty: formData.get('diffculti'),
          default_code: {
            python: formData.get('python_method'),
            csharp: formData.get('c#_method'),
            java: formData.get('java_method')
          },
          test_cases: testCasesList,
          code_run: code_run,
          corrent_answer: corrent_answer
      };

      console.log(newProblem);
      
      setProblems([...problems, newProblem]);
      alert("Problem added successfully");

      e.target.reset();
    }

    return (
        <>
            <NavBar/>
            <div className='flex flex-col items-center text-white'>
                <div className='mt-4 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl'>
                    <h2 className='text-xl text-white'>List of Users: </h2>
                    <ul className='list-disc pl-5'>
                        {users.map((user, index) => (
                            <li key={index} className='text-white'>{user.username} - {user.email}</li>
                        ))}
                    </ul>
                </div>
                <div className='mt-4 bg-gray-800 p-6 rounded-lg shadow-lg w-fit'>
                    <table>
                      <thead className="bg-gray-800 w-30">
                        <tr>
                          <th scope="col" className="py-3.5 px-4 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400">Problem</th>

                          <th scope="col" className="px-12 py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400">Diffcult</th>
                          
                          <th scope="col" className="px-12 py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400">Count</th>

                          <th scope="col" className="px-12 py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {
                          problems.map((problem, index) => (
                            <ProblemCardAdmin 
                              key={index} 
                              id={problem.id}
                              title={problem.title} 
                              difficulty={problem.difficulty}
                              completedAmount={countProblemsSolved(problem)}
                            />
                          ))
                        }
                      </tbody>
                    </table>

                    <div className='flex justify-center mt-4 w-full'>
                      <button onClick={reset} className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Reset</button>
                    </div>
                </div>

                <div className='mt-4 mb-4 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl'>
                  <h2 className='text-xl font-bold text-center text-white'>Add New Problem: </h2>

                  <form action="" onSubmit={(e) => addProblem(e)} className='mt-4'>
                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-white'>Title:</label>
                      <input required name='title' type="text" className='w-full p-2 mt-1 bg-gray-700 rounded-md text-white' placeholder='Problem Title' />
                    </div>

                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-white'>Description:</label>
                      <textarea required name='desciption' placeholder="Problem Description..." className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
                    </div>

                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-white'>Difficulty:</label>
                      <select required name='diffculti' className='w-full p-2 mt-1 bg-gray-700 rounded-md text-white'>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                    <label className='block text-2xl text-center mt-4 font-medium text-white'>Coding Side: </label>

                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-white'>Method Name:</label>
                      <input required name='method' type="text" className='w-full p-2 mt-1 bg-gray-700 rounded-md text-white' placeholder='Method Name' />
                    </div>

                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-white'>Method Return Type:</label>
                      <select required name='methodType' className='w-full p-2 mt-1 bg-gray-700 rounded-md text-white'>
                        <option value="int">Int</option>
                        <option value="float">Float</option>
                        <option value="string">String</option>
                        <option value="bool">Bool</option>
                        <option value="array">Array</option>
                      </select>
                    </div>

                    <div className='mt-4 mb-4'>
                      <div className='mt-2 mb-2'>
                        <label className='block text-sm font-medium text-white'>Python</label>
                        <textarea required name='python_method' placeholder="The method in python..." className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
                      </div>

                      <div className='mt-2 mb-2'>
                        <label className='block text-sm font-medium text-white'>C#</label>
                        <textarea required name='c#_method' placeholder="The method in c-sharp..." className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
                      </div>

                      <div className='mt-2 mb-2'>
                        <label className='block text-sm font-medium text-white'>Java</label>
                        <textarea required name='java_method' placeholder="The method in java..." className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-white'>Test Cases:</label>
                      <button type="button" onClick={() => setActiveTestCase(true)} className='inline px-4 py-2 text-ml font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Add Test Case</button>

                      <ul className='list-disc pl-5 mt-2'>
                        {testCasesList.map((testCase, index) => (
                          <li key={index} className='text-white'>
                            Input: {JSON.stringify(testCase.input)}, Output: {JSON.stringify(testCase.output)}
                            <button onClick={() => removeTestCase(index)} className='px-4 py-2 ml-5 font-medium text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80'>Remove</button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='mt-4'>
                      <button type="submit" className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80'>Add Problem</button>
                    </div>
                  </form>
                </div>
            </div>

            
            {
            activeTestCase && 
            <div className='fixed flex top-0 left-0 w-full h-full bg-[#181d39ad] text-white justify-center items-center py-2'>
              <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-[40%] h-[30%]'>
                <label className='block text-sm font-medium text-white'>Input: </label>
                <input name='title' value={input} onChange={(e) => setInput(e.target.value)} type="text" className='w-full p-2 mt-1 bg-gray-700 rounded-md text-white' placeholder='Input...' />

                <label className='block text-sm font-medium mt-7 text-white'>Output: </label>
                <input name='title' value={output} onChange={(e) => setOutput(e.target.value)} type="text" className='w-full p-2 mt-1 bg-gray-700 rounded-md text-white' placeholder='Output...' />

                <div className='flex justify-center mt-4 w-full'>
                  <button onClick={() => AddTestCase()} className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Add</button> 
                </div>
              </div>
            </div>
            }
        </>
    )
}

export default Admin