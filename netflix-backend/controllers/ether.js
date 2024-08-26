const { ethers, JsonRpcProvider } = require('ethers');

const provider = new JsonRpcProvider('http://127.0.0.1:8545');

provider.getNetwork().then(network => {
    console.log('Connected to network:', network);
}).catch(error => {
    console.error('Failed to connect to network:', error);
});