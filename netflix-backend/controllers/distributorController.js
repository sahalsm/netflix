const Distributor = require('../models/distributorModel');
const films = require('../models/filmsModel');
const series = require('../models/seriesModel');
require('dotenv').config();
const {ethers, JsonRpcProvider} = require("ethers");

const provider = new JsonRpcProvider('http://127.0.0.1:8545'); // Local Hardhat node
// const network = new ethers.Network('localhost', '1337');
// const provider = new ethers.JsonRpcProvider('http://localhost:8545', network, {
//   staticNetwork: network,
// });

const privateKey = "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0";
const wallet = new ethers.Wallet(privateKey, provider);
// const signer = provider.getSigner();
// 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
const contractAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "distributorBalances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "distributor",
          "type": "address"
        }
      ],
      "name": "payDistributor",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paymentAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const contract = new ethers.Contract(contractAddress, abi, wallet);
// provider.getBlockNumber().then(console.log).catch(console.error);

const createDistributor = async(req,res)=>{
    try {
        const distributor = new Distributor({
            email:req.body.email,
            name:req.body.name,
            company_name:req.body.company_name,
            payment_id:req.body.payment_id,
        })
        const Distributor_data = await distributor.save();
        res.status(200).send({success:true,msg:'Distributor Data', data:Distributor_data});

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}
const updateDistributor = async (req, res) => {
    const DistributorEmail = req.body.email;
    const DistributorName = req.body.name;
    const DistributorCompanyName = req.body.company_name;
    const DistributorPaymentID = req.body.payment_id;
    const DistributorContentID = req.body.content_id;
    const DistributorPaymentList = req.body.payment_list;

    try {
        const Distributor = await Distributor.findOne({ email: DistributorEmail });
        if (!Distributor) {
            return res.status(404).send({ success: false, msg: "Distributor Not Found" });
        }


        if (DistributorName) {
            Distributor.name = DistributorName;
        }
        if (DistributorCompanyName) {
            Distributor.company_name.push(DistributorCompanyName);
        }
        if (DistributorPaymentID) {
            Distributor.payment_id.push(DistributorPaymentID);
        }
        if (DistributorContentID) {
            Distributor.content_id = DistributorContentID;
        }
        if (DistributorPaymentList) {
            Distributor.payment_list.push(DistributorPaymentList);
        }

        const Distributor_data = await Distributor.save();
        res.status(200).send({ success: true, msg: 'Distributor Data Updated', data: Distributor_data });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const getDistributor = async(req,res)=>{
    const DistributorEmail = req.body.email;

    try {
        const Distributor_data = await Distributor.findOne({ email: DistributorEmail });
        if (!Distributor_data) {
            return res.status(404).send({ success: false, msg: "Distributor Not Found" });
        }
        res.status(200).send({ success: true, msg: 'Distributor Data Fetched', data: Distributor_data });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

const getDistributors = async(req,res)=>{
    try {
        const Distributor_data = await Distributor.find();
        if (!Distributor_data) {
            return res.status(404).send({ success: false, msg: "Distributors Not Found" });
        }
        res.status(200).send({ success: true, msg: 'Distributors Data Fetched', data: Distributor_data });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}


const deleteDistributor = async(req,res)=>{
    const DistributorEmail = req.body.email;
    try {
        const data = await Distributor.deleteOne({ email: DistributorEmail });

        if (data.deletedCount === 0) {
            return res.status(404).send({ success: false, msg: "Distributor Not Found" });
        }

        res.status(200).send({ success: true, msg: 'Distributor Deleted', data: data });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const distributorPayment = async(req, res)=>{
    async function checkNetwork() {
        try {

            const network = await provider.getNetwork();
            console.log('Connected to network:', network);
          } catch (error) {
            console.error('Network error:', error);
          }
      }
    checkNetwork();
    const distributorAddress = '0xF5Ad2cF33DE73Aa830f7437914eFbA70c4546Ee0';
    try { 
        const tx = await contract.payDistributor(distributorAddress, { value: ethers.utils.parseEther("1") });
        await tx.wait();
        res.status(200).json({ message: 'Payment successful', tx });
    } catch (error) {
        res.status(500).json({ message: 'Payment failed', error: error.message });
    }
}


module.exports = {
    createDistributor,
    updateDistributor,
    getDistributor,
    getDistributors,
    deleteDistributor,
    distributorPayment
}