// Import web3.js library
const Web3 = require('web3');

// Connect to Ethereum node (replace with your node URL)
const web3 = new Web3('http://localhost:8545');

// Define ABI for smart contract (replace with your contract ABI)
const contractABI = [
    {
        "constant": false,
        "inputs": [
            {"name": "_value", "type": "string"}
        ],
        "name": "setValue",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getValue",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// Create instance of smart contract object (replace with your contract address)
const contractAddress = '0x1234567890123456789012345678901234567890';
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Get DOM elements for displaying value and input field
const valueElem = document.getElementById('value');
const inputElem = document.getElementById('input');

// Display initial value of smart contract
contract.methods.getValue().call().then(value => {
    valueElem.textContent = value;
});

// Add event listener for setting value of smart contract
document.getElementById('set').addEventListener('click', () => {
    const newValue = inputElem.value;
    contract.methods.setValue(newValue).send({from: '0xabc...'}).then(() => {
        console.log('Value set successfully');
        valueElem.textContent = newValue;
    });
});
