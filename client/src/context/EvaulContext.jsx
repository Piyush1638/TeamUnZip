import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractAddress, contractABI } from "../utils/constants";

export const EvaultContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const legalRecordRegistryContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return legalRecordRegistryContract;
};

export const EvaultProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [clientsArray, setClientsArray] = useState([]);
  const [judgesArray, setJudgesArray] = useState([]);
  const [lawyersArray, setLawyersArray] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
      // if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        const legalRecordRegistryContract = getEthereumContract();
        const fetchedClientsArray =
          await legalRecordRegistryContract.getClientArray();
        const fetchedJudgesArray =
          await legalRecordRegistryContract.getJudgesArray();
        const fetchedLawyersArray =
          await legalRecordRegistryContract.getLawyersArray();

        setClientsArray(fetchedClientsArray);
        setJudgesArray(fetchedJudgesArray);
        setLawyersArray(fetchedLawyersArray);
        setIsConnected(true);
      } else {
        alert("No Accounts Detected OR Found.");
      }
      // console.log(accounts);
    } catch (error) {
      // alert(error.message);
      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      alert("Hey I got cllicked");
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
      console.log(currentAccount);
      console.log(accounts);
    } catch (error) {
      // alert(error.message);
      throw new Error("No ehtereum object.");
    }
  };

  const addClient = async(clientId, clientName, caseId, lawyerId)=>{
     try {
      if (!ethereum) return alert("Please install metamask");
      const addClient = getEthereumContract();
      const addClientResult = await addClient.addClient(clientId, clientName, caseId, lawyerId);
      await addClient.wait()
      console.log(addClientResult);
     } catch (error) {
      console.log(error.message)
     }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <EvaultContext.Provider
      value={{
        connectWallet,
        currentAccount,
        isConnected,
        clientsArray,
        judgesArray,
        lawyersArray,
        addClient,
      }}
    >
      {children}
    </EvaultContext.Provider>
  );
};
