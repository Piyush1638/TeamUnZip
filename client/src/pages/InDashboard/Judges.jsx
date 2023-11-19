import React from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const judges = [
  {
    id: 1,
    JudgeName: "Judge 1",
    JudgeId: "131423423",
  },
  {
    id: 2,
    JudgeName: "Judge 2",
    JudgeId: "131423422",
  },
  {
    id: 3,
    JudgeName: "Judge 3",
    JudgeId: "133423423",
  },
  {
    id: 4,
    JudgeName: "Judge 4",
    JudgeId: "131424423",
  },
  {
    id: 5,
    JudgeName: "Judge 5",
    JudgeId: "135423423",
  },
  
];




const Judges = () => {
    const [isAllowed, setIsAllowed] = React.useState(true);
    const navigate = useNavigate();
  return (
    <Layout>
      <div className="relative">
        <h1 className="text-2xl text-center mt-3 font-light text-white">Judges:</h1>

        <div className="flex fixed bottom-9 right-9" onClick={() => {
              isAllowed ? navigate("/add-judge") : alert("You are not allowed to add a judge");
            }}>
          <button
            
            className="  bg-black rounded-md text-white h-12 w-36 text-2xl hover:opacity-70"
          >
            Add Judge
          </button>
        </div>

        <div>
          <ul className="mt-5">
            {judges.map((caseItem) => (
              <li
                key={caseItem.id}
                className="bg-white shadow-md px-8 py-6 rounded-lg my-5"
              >
                <p className="font-bold">Judge Name: {caseItem.JudgeName}</p>
                <p>Judge ID: {caseItem.JudgeId}</p>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Judges;
