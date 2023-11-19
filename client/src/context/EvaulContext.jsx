import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import {contractAddress, contractABI} from "../utils/constants";

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

  console.log({
    provider,
    signer,
    legalRecordRegistryContract
  })

  return transactionContract;
};

export const EvaultProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false)

  const checkIfWalletIsConnected = async () => {
    try {
      // if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // getAllTransactions();
        console.log(accounts);
        console.log(accounts[0]); // Log the correct account immediately
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
     alert("Hey I got cllicked")
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log(currentAccount)
      console.log(accounts);
    } catch (error) {
      // alert(error.message);
      throw new Error("No ehtereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <EvaultContext.Provider value={{connectWallet, currentAccount, isConnected }}>
      {children}
    </EvaultContext.Provider>
  );
};
