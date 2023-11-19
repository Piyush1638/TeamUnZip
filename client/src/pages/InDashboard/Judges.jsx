import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

import { EvaultContext } from "../../context/EvaulContext";

const Judges = () => {
  const navigate = useNavigate();
  const { judgesArray, isConnected, getJudgeDetails } =
    useContext(EvaultContext);
  const [judgesData, setJudgesData] = useState([]);
  const [isAllowed, setIsAllowed] = useState(true);
  useEffect(() => {
    const fetchJudgeData = async () => {
      if (isConnected && judgesArray.length > 0) {
        const judgeDetails = await Promise.all(
          judgesArray.map(async (judgeAddress) => {
            const details = await getJudgeDetails(judgeAddress);
            return {
              address: judgeAddress,
              details: details,
            };
          })
        );

        setJudgesData(judgeDetails);
      }
    };

    fetchJudgeData();
  }, [isConnected, judgesArray, getJudgeDetails]);

  return (
    <Layout>
      <div className="relative">
        <h1 className="text-2xl text-center mt-3 font-bold text-white rounded-xl m-10 bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 white-glassmorpism">
          JUDGES
        </h1>
        <div
          className="flex fixed bottom-9 right-9"
          onClick={() => {
            isAllowed
              ? navigate("/add-judge")
              : alert("You are not allowed to add a case");
          }}
        >
          <button className=" bg-black rounded-md text-white h-12 w-32 text-2xl hover:border-2 hover:border-purple-600 hover:text-purple-600">
            Add Judge
          </button>
        </div>
        <div className="flex flex-col m-10 ">
          <ul className="mt-5 ">
            {judgesData.map((judge) => (
              <li
                key={judge.address}
                className="bg-[#0b0212] text-white border-2 border-slate-400  flex flex-col shadow-md px-8 py-6 rounded-lg my-5 hover:border-purple-600"
              >
                <p className="font-bold">Judge Name: {judge.details[0]}</p>
                <p>Judge ID: {judge.details[1]}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Judges;
