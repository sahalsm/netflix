async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const ContentPayment = await ethers.getContractFactory("ContentPayment");
    const contentPayment = await ContentPayment.deploy();
  
    console.log("ContentPayment deployed to:", contentPayment.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  