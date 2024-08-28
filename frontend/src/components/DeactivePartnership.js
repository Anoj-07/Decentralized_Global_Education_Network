import React, { useState } from 'react';
import contract from '../contracts/GlobalEducationNetwork';
import web3 from '../contracts/web3';

function DeactivatePartnership() {
    const [partnershipId, setPartnershipId] = useState('');

    const deactivatePartnership = async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.deactivatePartnership(partnershipId).send({ from: accounts[0] });
    };

    return (
        <div>
            <h2 className='text-center text-lg font-bold'>Deactivate Partnership</h2>
            <input
                type="text"
                value={partnershipId}
                onChange={(e) => setPartnershipId(e.target.value)}
                placeholder="Partnership ID"
            />
            <button 
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={deactivatePartnership}>Deactivate Partnership</button>
        </div>
    );
}

export default DeactivatePartnership;
