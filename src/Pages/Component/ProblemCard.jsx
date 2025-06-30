import { useRenderCount } from '@uidotdev/usehooks';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProblemCard({ id, title, difficulty, status }) {
    const difficultyColor = {
        'Hard': 'text-red-500',
        'Medium': 'text-yellow-500',
        'Easy': 'text-emerald-500'
    }[difficulty] || 'text-emerald-500';

    const statusInfo = {
        text: status ? 'Active' : 'Inactive',
        color: status ? 'text-emerald-500' : 'text-gray-400'
    };

    const navigate = useNavigate();

    const OpenProblem = () => {
        navigate(`/problem/${id}`);
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
                <div className={`inline px-3 py-1 text-sm ${statusInfo.color} font-normal rounded-full gap-x-2 bg-gray-100 dark:bg-gray-800`}>
                    {statusInfo.text}
                </div>
            </td>
        </tr>
    );
}

export default ProblemCard;
