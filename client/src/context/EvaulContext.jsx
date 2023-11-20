// EvaultProvider.js

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress2, contractABI2 } from "../utils/constants";

export const EvaultContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const legalRecordRegistryContract = new ethers.Contract(
    contractAddress2,
    contractABI2,
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

  const [casesArray, setCasesArray] = useState([]);
  const [casesData, setCasesData] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
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
    } catch (error) {
      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      throw new Error("No ethereum object.");
    }
  };

  const addClient = async (clientId, clientName, caseId, lawyerId) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const addClient = getEthereumContract();
      const addClientResult = await addClient.addClient(
        clientId,
        clientName,
        caseId,
        lawyerId
      );
      console.log(addClientResult);
      alert("Client Added Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getClientDetails = async (clientAddress) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const legalRecordRegistryContract = getEthereumContract();
      const clientDetails = await legalRecordRegistryContract.getClientDetails(
        clientAddress
      );
      return clientDetails; // Assuming this returns an array of client details
    } catch (error) {
      console.log(error.message);
    }
  };

  const addLawyer = async (lawyerId, lawyerName) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const addLawyer = getEthereumContract();
      const addLawyerResult = await addLawyer.addLawyer(lawyerId, lawyerName);
      console.log(addLawyerResult);
      alert("Lawyer Added Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLawyerDetails = async (lawyerAddress) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const legalRecordRegistryContract = getEthereumContract();
      const lawyerDetails = await legalRecordRegistryContract.getLawyerDetails(
        lawyerAddress
      );
      return lawyerDetails; // Assuming this returns an array of lawyer details
    } catch (error) {
      console.log(error.message);
    }
  };

  const addJudge = async (judgeAddress, name) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const addJudge = getEthereumContract();
      const addJudgeResult = await addJudge.addJudge(judgeAddress, name);
      console.log(addJudgeResult);
      alert("Judge Added Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getJudgeDetails = async (judgeAddress) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const legalRecordRegistryContract = getEthereumContract();
      const judgeDetails = await legalRecordRegistryContract.getJudgeDetails(
        judgeAddress
      );
      return judgeDetails; // Assuming this returns an array of judge details
    } catch (error) {
      console.log(error.message);
    }
  };

  const addCase = async (caseId, clientId, lawyerId, documentLink) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const legalRecordRegistryContract = getEthereumContract();
      await legalRecordRegistryContract.addCase(
        caseId,
        clientId,
        lawyerId,
        documentLink
      );
      alert("Case Added Successfully!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCasesArray = async () => {
    try {
      const legalRecordRegistryContract = getEthereumContract();
      const fetchedCasesArray = await legalRecordRegistryContract.getCasesArray();
      setCasesArray(fetchedCasesArray);
    } catch (error) {
      console.error("Error fetching cases array:", error.message);
    }
  };

  const getCaseDetails = async (caseId) => {
    try {
      const legalRecordRegistryContract = getEthereumContract();
      const caseDetails = await legalRecordRegistryContract.getCaseDetails(caseId);
      return caseDetails; // Adjust this based on the actual return structure
    } catch (error) {
      console.error(`Error fetching case details for ${caseId}:`, error.message);
    }
  };

  const getCasesDetails = async () => {
    try {
      const legalRecordRegistryContract = getEthereumContract();
      const casesDetails = await Promise.all(
        casesArray.map(async (caseId) => {
          const details = await getCaseDetails(caseId);
          return {
            id: caseId,
            details: details,
          };
        })
      );

      setCasesData(casesDetails);
    } catch (error) {
      console.error("Error fetching cases details:", error.message);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getCasesArray(); // Fetch cases array when component mounts
  }, []);

  useEffect(() => {
    getCasesDetails(); // Fetch cases details when casesArray is updated
  }, [casesArray, getCaseDetails]);

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
        addLawyer,
        addJudge,
        addCase,
        getClientDetails,
        getLawyerDetails,
        getJudgeDetails,
        casesArray,
        casesData,
        getCaseDetails,
        getCasesDetails,
      }}
    >
      {children}
    </EvaultContext.Provider>
  );
};
