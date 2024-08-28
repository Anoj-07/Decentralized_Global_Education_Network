// src/contracts/GlobalEducationNetwork.js

import web3 from './web3';
import ContractABI from './GlobalEducationNetworkABI.json';



// Replace with your deployed contract address
const address = '0x1B46774fF2532c8Ee50F28a128847dF0b2148935';

// Create a contract instance
const contract = new web3.eth.Contract(ContractABI, address);

export default contract;
