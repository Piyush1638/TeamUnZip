// web3.js
import { ethers } from "ethers";

// Function to connect to the deployed contract
const connectToContract = async (contractAddress, contractAbi, signer) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const connectedContract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
  return connectedContract;
};

export default connectToContract;
