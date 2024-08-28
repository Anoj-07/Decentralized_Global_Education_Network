import React, { useState } from 'react';
import contract from '../contracts/GlobalEducationNetwork';
import web3 from '../contracts/web3';

const DeactivateInstitutionButton = () => {
    const [address, setAddress] = useState('');

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const deactivateInstitution = async () => {
        try {
            const accounts = await web3.eth.getAccounts();

            if (!web3.utils.isAddress(address)) {
                throw new Error("Invalid address");
            }

            if (typeof contract.methods.deactivateInstitution !== 'function') {
                throw new Error("deactivateInstitution method is not available in the contract");
            }

            await contract.methods.deactivateInstitution(address).send({ from: accounts[0] });

            setAddress('');
        } catch (error) {
            console.error("Error deactivating institution:", error);
        }
    };

    return (
        <div className='my-5 mx-20'>
            <h2 className='text-center text-lg font-bold'>Deactivate Institution </h2>
            <input
            className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 pb-5 mb-5'
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter institution address"
            />
            <button 
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={deactivateInstitution}>Deactivate Institution</button>
        </div>
    );
};

export default DeactivateInstitutionButton;
