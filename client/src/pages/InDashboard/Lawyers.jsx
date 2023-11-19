import React from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const lawyers = [
  {
    id: 1,
    LawyerName: "Lawyer 1",
    LawyerId: "131423423",
  },
  {
    id: 2,
    LawyerName: "Lawyer 2",
    LawyerId: "131423422",
  },
  {
    id: 3,
    LawyerName: "Lawyer 3",
    LawyerId: "133423423",
  },
  {
    id: 4,
    LawyerName: "Lawyer 4",
    LawyerId: "131424423",
  },
  {
    id: 5,
    LawyerName: "Lawyer 5",
    LawyerId: "135423423",
  },
  
];




const Lawyers = () => {
    const [isAllowed, setIsAllowed] = React.useState(true);
    const navigate = useNavigate();
  return (
    <Layout>
      <div className="relative">
        <h1 className="text-2xl text-center mt-3 font-light text-white">Lawyers:</h1>

        <div className="flex fixed bottom-9 right-9" onClick={() => {
              isAllowed ? navigate("/add-lawyer") : alert("You are not allowed to add a case");
            }}>
          <button
            
            className="  bg-black rounded-md text-white h-12 w-36 text-2xl hover:opacity-70"
          >
            Add Lawyer
          </button>
        </div>

        <div>
          <ul className="mt-5">
            {lawyers.map((caseItem) => (
              <li
                key={caseItem.id}
                className="bg-white shadow-md px-8 py-6 rounded-lg my-5"
              >
                <p className="font-bold">Lawyer Name: {caseItem.LawyerName}</p>
                <p>Lawyer ID: {caseItem.LawyerId}</p>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Lawyers;
