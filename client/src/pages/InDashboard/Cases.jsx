import React from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const cases = [
  {
    id: 1,
    name: "Case 1",
    caseId: "131423423",
    lawyerId: "123123123",
    judgeId: "123123123",
    documents: [],
  },
  {
    id: 2,
    name: "Case 2",
    caseId: "131423424",
    lawyerId: "123123124",
    judgeId: "123123124",
    documents: [],
  },
  {
    id: 3,
    name: "Case 3",
    caseId: "131423425",
    lawyerId: "123123125",
    judgeId: "123123125",
    documents: [],
  },
  {
    id: 4,
    name: "Case 4",
    caseId: "131423426",
    lawyerId: "123123126",
    judgeId: "123123126",
    documents: [],
  },
  {
    id: 5,
    name: "Case 5",
    caseId: "131423427",
    lawyerId: "123123127",
    judgeId: "123123127",
    documents: [],
  },
];




const Cases = () => {
    const [isAllowed, setIsAllowed] = React.useState(true);
    const navigate = useNavigate();
  return (
    <Layout>
      <div className="relative">
        <h1 className="text-2xl text-center mt-3 font-light text-white">Cases:</h1>

        <div className="flex fixed bottom-9 right-9" onClick={() => {
              isAllowed ? navigate("/add-case") : alert("You are not allowed to add a case");
            }}>
          <button
            
            className="  bg-black rounded-md text-white h-12 w-32 text-2xl hover:opacity-70"
          >
            Add Case
          </button>
        </div>

        <div>
          <ul className="mt-5">
            {cases.map((caseItem) => (
              <li
                key={caseItem.id}
                className="bg-white shadow-md px-8 py-6 rounded-lg my-5"
              >
                <p className="font-bold">Case Name: {caseItem.name}</p>
                <p>Case ID: {caseItem.caseId}</p>
                <p>Lawyer ID: {caseItem.lawyerId}</p>
                <p>Judge ID: {caseItem.judgeId}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Cases;
