const main = async() =>{
    const LegalRoleRegistry3 = await hre.ethers.getContractFactory("LegalRoleRegistry3");
    const legalRoleRegistry3 = await LegalRoleRegistry3.deploy();
  
    await legalRoleRegistry3.deployed();
    console.log("LegalRoleRegistry3 contract deployed to:",legalRoleRegistry3.address);
  
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
  