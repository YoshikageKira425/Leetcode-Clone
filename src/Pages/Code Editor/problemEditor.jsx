import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import data from "../data.json";
import NavBar from '../Component/NavBar';

function ProblemEditor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [problems, setProblems] = useLocalStorage("problems", JSON.parse(JSON.stringify(data)));
    const [problem, setProblem] = useState(problems.find(p => p.id === Number(id)) || {});

    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {});
    
    const [activeTestCase, setActiveTestCase] = useState(false);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [testCasesList, setTestCasesList] = useState(problem.test_cases || []);

    useEffect(() => 
    {
        if (Object.keys(currentUser).length === 0) {
            navigate('/sign-up');
        }
    
        if (!currentUser.isAdmin) {
            navigate('/');
        } 
    }, [currentUser, navigate]);

    useEffect(() => {
        if (problem && Object.keys(problem).length === 0) {
          navigate("/not-found");
        }
    }, [problem, navigate]);

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

    const updateProblem = (e) =>
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
            const input = JSON.stringify(element.input);

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
            id: Number(id),
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
        
        const updatedProblems = problems.map(p => p.id === problem.id ? newProblem : p);
        setProblems(updatedProblems);
        alert("Problem updated successfully");

        e.target.reset();
    }

    const removeTestCase = (index) =>
    {
        const updatedTestCases = testCasesList.filter((_, i) => i !== index);
        setTestCasesList(updatedTestCases);
        alert("Test case removed successfully");
    }

    return (
        <>
            <NavBar />

            <div className='flex justify-center'>
                <div className='bg-gray-800 mt-5 mb-5 p-6 rounded-lg shadow-lg w-full max-w-2xl'>
                    <h2 className='text-xl font-bold text-center text-white'>Modify Problem: </h2>

                    <form action="" onSubmit={updateProblem} className='mt-4'>
                        <div className='mt-4'>
                            <label className='block text-sm font-medium text-white'>Title:</label>
                            <input required name='title' type="text" className='w-full p-2 mt-1 bg-gray-700 rounded-md text-white' placeholder='Problem Title' defaultValue={problem.title}/>
                        </div>

                        <div className='mt-4'>
                            <label className='block text-sm font-medium text-white'>Description:</label>
                            <textarea required name='desciption' placeholder="Problem Description..." className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" defaultValue={problem.description}></textarea>
                        </div>

                        <div className='mt-4'>
                            <label className='block text-sm font-medium text-white'>Difficulty:</label>
                            <select required name='diffculti' defaultValue={problem.difficulty} className='w-full p-2 mt-1 bg-gray-700 rounded-md text-white'>
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
                                <textarea defaultValue={problem && Object.keys(problem).length > 0 && problem.default_code.python} required name='python_method' placeholder="The method in python..." className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
                            </div>

                            <div className='mt-2 mb-2'>
                                <label className='block text-sm font-medium text-white'>C#</label>
                                <textarea defaultValue={problem && Object.keys(problem).length > 0 && problem.default_code.csharp} required name='c#_method' placeholder="The method in c-sharp..." className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
                            </div>

                            <div className='mt-2 mb-2'>
                                <label className='block text-sm font-medium text-white'>Java</label>
                                <textarea defaultValue={problem && Object.keys(problem).length > 0 && problem.default_code.java} required name='java_method' placeholder="The method in java..." className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-white'>Test Cases:</label>
                            <button type="button" onClick={() => setActiveTestCase(true)} className='inline px-4 py-2 text-ml font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Add Test Case</button>

                            <ul className='list-disc pl-5 mt-2'>
                            {testCasesList.map((testCase, index) => (
                                <li key={index} className='text-white'>
                                    Input: {JSON.stringify(testCase.input)}, Output: {JSON.stringify(testCase.output)}
                                    <button type='button' onClick={() => removeTestCase(index)} className='px-4 py-2 ml-5 font-medium text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80'>Remove</button>
                                </li>
                            ))}
                        </ul>
                        </div>

                        <div className='mt-4'>
                            <button type="submit" className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80'>Update Problem</button>
                            <Link to={`/problem/${id}`} className='px-6 py-2 ml-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80'>Problem</Link>
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

export default ProblemEditor