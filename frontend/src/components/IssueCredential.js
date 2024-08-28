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
        <div>
            <h2>Issue Credential</h2>
            <input
                type="text"
                value={partnershipId}
                onChange={(e) => setPartnershipId(e.target.value)}
                placeholder="Partnership ID"
            />
            <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Student Name"
            />
            <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course Name"
            />
            <button onClick={issueCredential}>Issue Credential</button>
        </div>
    );
}

export default IssueCredential;
