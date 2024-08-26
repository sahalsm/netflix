// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContentPayment {
    address public owner;
    uint256 public constant paymentAmount = 1 ether; // Updated to 1 ETH

    mapping(address => uint256) public distributorBalances;

    constructor() {
        owner = msg.sender;
    }

    function payDistributor(address distributor) public payable {
        require(msg.value == paymentAmount, "Incorrect payment amount");
        distributorBalances[distributor] += msg.value;
    }

    function withdraw() public {
        uint256 amount = distributorBalances[msg.sender];
        require(amount > 0, "No balance to withdraw");

        distributorBalances[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed.");
    }
}
