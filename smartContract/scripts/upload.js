const main = async() =>{
    const LegalCaseRegistry = await hre.ethers.getContractFactory("LegalCaseRegistry");
    const legalCaseRegistry = await LegalCaseRegistry.deploy();
  
    await legalCaseRegistry.deployed();
    console.log("LegalCaseRegistry contract deployed to:",legalCaseRegistry.address);
  
  }
  
  const runMain = async ()=>{
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  
  runMain();
  