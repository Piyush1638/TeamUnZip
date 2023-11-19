import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { EvaultContext } from "../../context/EvaulContext";

const Clients = () => {
    const { clientsArray, isConnected, getClientDetails } = useContext(EvaultContext);
    const [clientsData, setClientsData] = useState([]);
    const [isAllowed, setIsAllowed] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientData = async () => {
            if (isConnected && clientsArray.length > 0) {
                // Assuming your smart contract has a function to get client details by address
                // Modify this part based on your smart contract functions
                const clientDetails = await Promise.all(
                    clientsArray.map(async (clientAddress) => {
                        const details = await getClientDetails(clientAddress);
                        return {
                            address: clientAddress,
                            details: details,
                        };
                    })
                );

                setClientsData(clientDetails);
            }
        };

        fetchClientData();
    }, [isConnected, clientsArray, getClientDetails]);

    const handleClick = () =>{
        if (isAllowed) {
            navigate("/add-client");
        } else {
            alert("You are not allowed to add a case");
        }
    }

    return (
        <Layout>
            <div className="relative">
                <h1 className="text-2xl text-center mt-3 font-bold text-white rounded-xl m-10 bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 white-glassmorpism">CLIENT</h1>

                <div
                    className="flex fixed bottom-9 right-9"
                    onClick={() => {
                        isAllowed
                            ? navigate("/add-client")
                            : alert("You are not allowed to add a case");
                    }}
                >
                    <button className=" bg-black rounded-md text-white h-12 w-32 text-2xl hover:border-2 hover:border-purple-600 hover:text-purple-600">
                        Add Client
                    </button>
                </div>

                <div className="flex flex-col m-10 ">
                    <ul className="mt-5 ">
                        {clientsData.map((client) => (
                            <li
                                key={client.address}
                                className="bg-[#0b0212] text-white border-2 border-slate-400  flex flex-col shadow-md px-8 py-6 rounded-lg my-5 hover:border-purple-600"
                            >
                                <p className="font-bold">Client Name: {client.details[0]}</p>
                                <p>Client ID: {client.details[1]}</p>
                                <p>Client Case Id: {client.details[2]}</p>
                                <p>Lawyer ID: {client.details[3]}</p>
                                {/* Add more details as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default Clients;
