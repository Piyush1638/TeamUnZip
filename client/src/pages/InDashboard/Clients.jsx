import React from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const clients = [
  {
    id: 1,
    ClientName: "Client 1",
    ClientId: "131423423",
    ClientCasesIds: "131423423",
  },
  {
    id: 2,
    ClientName: "Client 2",
    ClientId: "131423422",
    ClientCasesIds: "131423423",

  },
  {
    id: 3,
    ClientName: "Client 3",
    ClientId: "133423423",
    ClientCasesIds:"131423423",

  },
  {
    id: 4,
    ClientName: "Client 4",
    ClientId: "131424423",
    ClientCasesIds: "131423423",

  },
  {
    id: 5,
    ClientName: "Client 5",
    ClientId: "135423423",
    ClientCasesIds: "131423423",

  },
  
];




const Clients = () => {
    const [isAllowed, setIsAllowed] = React.useState(true);
    const navigate = useNavigate();
  return (
    <Layout>
      <div className="relative">
        <h1 className="text-2xl text-center mt-3 font-light text-white">Clients:</h1>

        <div className="flex fixed bottom-9 right-9" onClick={() => {
              isAllowed ? navigate("/add-client") : alert("You are not allowed to add a case");
            }}>
          <button
            
            className="  bg-black rounded-md text-white h-12 w-32 text-2xl hover:opacity-70"
          >
            Add Client
          </button>
        </div>

        <div>
          <ul className="mt-5">
            {clients.map((caseItem) => (
              <li
                key={caseItem.id}
                className="bg-white shadow-md px-8 py-6 rounded-lg my-5"
              >
                <p className="font-bold">Client Name: {caseItem.ClientName}</p>
                <p>Client ID: {caseItem.ClientId}</p>
                <p>Client Case Id: {caseItem.ClientCasesIds}</p>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Clients;
