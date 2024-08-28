import React, { useState } from 'react';
import contract from '../contracts/GlobalEducationNetwork';
import web3 from '../contracts/web3';

function IssueCredential() {
    const [partnershipId, setPartnershipId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [courseName, setCourseName] = useState('');

    const issueCredential = async () => {
        try {
            const accounts = await web3.eth.getAccounts();

            // Ensure the contract method exists
            if (typeof contract.methods.issueCredential !== 'function') {
                throw new Error("issueCredential method is not available in the contract");
            }

            await contract.methods.issueCredential(partnershipId, studentName, courseName).send({ from: accounts[0] });
            alert('Credential issued successfully!');
        } catch (error) {
            console.error("Error issuing credential:", error);
        }
    };

    return (
        <div className='my-5 mx-20'>
            <h2 className='text-center text-lg font-bold'>Issue Credential</h2>
            <input
            className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 pb-5 mb-5'
                type="text"
                value={partnershipId}
                onChange={(e) => setPartnershipId(e.target.value)}
                placeholder="Partnership ID"
            />
            <input
            className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 pb-5 mb-5'
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Student Name"
            />
            <input
            className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 pb-5 mb-5'
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course Name"
            />
            <button 
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800s'
            onClick={issueCredential}>Issue Credential</button>
        </div>
    );
}

export default IssueCredential;
