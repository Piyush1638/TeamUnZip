import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { EvaultContext } from "../../context/EvaulContext";

const Cases = () => {
    const { casesArray, isConnected, getCaseDetails } = useContext(EvaultContext);
    const [casesData, setCasesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAllowed, setIsAllowed] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCasesData = async () => {
            try {
                if (isConnected && casesArray.length > 0) {
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
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCasesData();
    }, [isConnected, casesArray, getCaseDetails]);

    return (
        <Layout>
            <div className="relative">
                <h1 className="text-2xl text-center mt-3 font-bold text-white rounded-xl m-10 bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 white-glassmorpism">CASES</h1>

                <div
                    className="flex fixed bottom-9 right-9"
                    onClick={() => {
                        isAllowed
                            ? navigate("/add-case")
                            : alert("You are not allowed to add a case");
                    }}
                >
                    <button className=" bg-black rounded-md text-white h-12 w-32 text-2xl hover:border-2 hover:border-purple-600 hover:text-purple-600">
                        Add Case
                    </button>
                </div>

                <div className=" ">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul className="mt-5 mx-20">
                            {casesData.map((caseItem) => (
                                <li
                                    key={caseItem.id}
                                    className="bg-[#0b0212] text-white border-2 border-slate-400  flex flex-col shadow-md px-8 py-6 rounded-lg my-5 hover:border-purple-600"
                                >
                                    <p className="font-bold">Case Name: {caseItem.details[0]}</p>
                                    <p>Case ID: {caseItem.details[1]}</p>
                                    <p>Client ID: {caseItem.details[2]}</p>
                                    <p>Lawyer ID: {caseItem.details[3]}</p>
                                    {/* Add more details as needed */}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Cases;
