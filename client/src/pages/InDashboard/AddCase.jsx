// AddCase.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadFile from "./UploadFile";
import { EvaultContext } from "../../context/EvaulContext";
import connectToContract from "../../components/web3"; // Import the Web3 service

import {uploadContractAddress, uploadContractABI} from "../../utils/constants";

const AddCase = () => {
  const { currentAccount } = useContext(EvaultContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    caseId: "",
    clientId: "",
    lawyerId: "",
    judgeId: "",
  })

  const {caseId,clientId, lawyerId, judgeId} = formData;

  const contractAddress = uploadContractAddress;
  const contractAbi = uploadContractABI; // Your contract ABI
  const contract = connectToContract(contractAddress, contractAbi, currentAccount);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add validation if needed
      if(!caseId || !clientId || !lawyerId || !judgeId) return alert("All fields must be filled");

      // Call the addCase function on the smart contract
      await contract.addCase(caseId, clientId, lawyerId, judgeId, "imgHash");

      alert("Case added successfully!");
      // Optionally, you can navigate to another page or reset the form
      navigate("/cases");
    } catch (error) {
      console.error("Error adding case:", error);
      alert("Failed to add case. Please try again.");
    }
  };

   const onChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
   }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-4">Add a Case</h1>
      <div>
        <form className="w-[500px] mt-32 ml-[500px]" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="caseId"
              id="caseId"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={caseId}
              onChange={onChange}
            />
            <label
              htmlFor="caseId"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Case Id
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="clientId"
              id="clientId"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={clientId}
              onChange={onChange}
            />
            <label
              htmlFor="clientId"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Client Id
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="lawyerId"
              id="lawyerId"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={lawyerId}
              onChange={onChange}
            />
            <label
              htmlFor="lawyerId"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Lawyer Id
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="judgeId"
              id="judgeId"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={judgeId}
              onChange={onChange}
            />
            <label
              htmlFor="judgeId"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Judge Id
            </label>
          </div>
          {/* Repeat similar input fields for clientId, lawyerId, judgeId */}
          <UploadFile contract={contract} account={currentAccount} />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
          <Link className="ml-7 hover:underline" to="/cases">
            Take me back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddCase;
