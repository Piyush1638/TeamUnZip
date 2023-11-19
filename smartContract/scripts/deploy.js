const main = async() =>{
  const LegalRoleRegistry = await hre.ethers.getContractFactory("LegalRoleRegistry");
  const legalRoleRegistry = await LegalRoleRegistry.deploy();

  await legalRoleRegistry.deployed();
  console.log("LegalRoleRegistry contract deployed to:",legalRoleRegistry.address);

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
