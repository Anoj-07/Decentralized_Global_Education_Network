import React, { useState, useEffect } from 'react';
import contract from '../contracts/GlobalEducationNetwork';
import web3 from '../contracts/web3';

const AddInstitutionButton = () => {
    const [institutionAddress, setInstitutionAddress] = useState('');
    const [institutionName, setInstitutionName] = useState('');

    useEffect(() => {
        const checkMethods = async () => {
            try {
                const methods = contract.methods;
                console.log('Contract methods:', methods);

                // Check if addInstitution method exists in the contract
                if (methods.addInstitution) {
                    console.log('addInstitution method is available.');
                } else {
                    console.error('addInstitution method is NOT available.');
                }
            } catch (error) {
                console.error('Error checking methods:', error);
            }
        };

        checkMethods();
    }, []);

    const handleAddressChange = (event) => {
        setInstitutionAddress(event.target.value);
    };

    const handleNameChange = (event) => {
        setInstitutionName(event.target.value);
    };

    const addInstitution = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            console.log('Accounts:', accounts);

            // Check if the contract method is correctly defined
            if (!contract.methods.addInstitution) {
                throw new Error("addInstitution method is not available.");
            }

            // Send transaction to add institution
            const result = await contract.methods.addInstitution(institutionAddress, institutionName).send({ from: accounts[0] });

            console.log('Transaction result:', result);

            // Clear input fields after successful transaction
            setInstitutionAddress('');
            setInstitutionName('');
        } catch (error) {
            console.error("Error adding institution:", error);
        }
    };

    return (
        <div className='mx-20'>
            <h2 className='text-center text-lg font-bold'>Add Institution</h2>
            <input className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 pb-5 mb-5'
                type="text"
                value={institutionAddress}
                onChange={handleAddressChange}
                placeholder="Enter institution address"
            />
            <input
            className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 pb-5 mb-5'
                type="text"
                value={institutionName}
                onChange={handleNameChange}
                placeholder="Enter institution name"
            />
            <button 
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={addInstitution}>Add Institution</button>
        </div>
    );
};

export default AddInstitutionButton;
