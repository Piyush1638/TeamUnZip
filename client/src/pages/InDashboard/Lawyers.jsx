import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { EvaultContext } from "../../context/EvaulContext";

const Lawyers = () => {
  const { lawyersArray, isConnected, getLawyerDetails } = useContext(EvaultContext);
  const [lawyersData, setLawyersData] = useState([]);
  const [isAllowed, setIsAllowed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLawyerData = async () => {
      if (isConnected && lawyersArray.length > 0) {
        // Assuming your smart contract has a function to get lawyer details by address
        // Modify this part based on your smart contract functions
        const lawyerDetails = await Promise.all(
          lawyersArray.map(async (lawyerAddress) => {
            const details = await getLawyerDetails(lawyerAddress);
            return {
              address: lawyerAddress,
              details: details,
            };
          })
        );

        setLawyersData(lawyerDetails);
      }
    };

    fetchLawyerData();
  }, [isConnected, lawyersArray, getLawyerDetails]);

  return (
    <Layout>
      <div className="relative">
        <h1 className="text-2xl text-center mt-3 font-bold text-white rounded-xl m-10 bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 white-glassmorpism">LAWYER</h1>

        <div className="flex fixed bottom-9 right-9" onClick={() => {
          isAllowed ? navigate("/add-lawyer") : alert("You are not allowed to add a case");
        }}>
          <button
            className="  bg-black rounded-md text-white h-12 w-32 text-2xl hover:border-2 hover:border-purple-600 hover:text-purple-600"
          >
            Add Lawyer
          </button>
        </div>

        <div className="flex flex-col m-10">
          <ul className="mt-5">
            {lawyersData.map((lawyer) => (
              <li
                key={lawyer.address}
                className="bg-[#0b0212] text-white border-2 border-slate-400  flex flex-col shadow-md px-8 py-6 rounded-lg my-5 hover:border-purple-600"
              >
                <p className="font-bold">Lawyer Name: {lawyer.details[0]}</p>
                <p>Lawyer ID: {lawyer.details[1]}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Lawyers;
