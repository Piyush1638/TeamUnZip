import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EvaultContext } from "../../context/EvaulContext";

const AddJudge = () => {
    const navigate = useNavigate();
    const {addJudge} = useContext(EvaultContext);
    const [formData, setFormData] = useState({
        judgeId: "",
        judgeName: "",
    });

    const {judgeId, judgeName} = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!judgeId || !judgeName) return alert("All fields must be filled.");
        addJudge(judgeId, judgeName)
    };
  return (
    <div>
        <h1 className="text-3xl font-bold text-center mt-4"> Add a Judge</h1>
        <div>
      <form onSubmit={onSubmit} className="w-[500px] mt-32 ml-[500px]">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="judgeId"
            id="judgeId"
            value={judgeId}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="judgeId"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Judge Id
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="judgeName"
            id="judgeName"
            value={judgeName}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="judgeName"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Judge Name
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <Link className=" ml-7 hover:underline" to="/judges">Take me back</Link>
      </form>
    </div>
    </div>
  );
};

export default AddJudge;
