const { ethers } = require('ethers');

// Generate a new wallet
const wallet = ethers.Wallet.createRandom();
console.log('Private Key:', wallet.privateKey);