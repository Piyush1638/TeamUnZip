const main = async() =>{
    const LegalRoleRegistry2 = await hre.ethers.getContractFactory("LegalRoleRegistry2");
    const legalRoleRegistry2 = await LegalRoleRegistry2.deploy();
  
    await legalRoleRegistry2.deployed();
    console.log("LegalRoleRegistry2 contract deployed to:",legalRoleRegistry2.address);
  
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
  