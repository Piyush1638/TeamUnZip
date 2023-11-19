import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import img2 from "../assets/Judge.png";
import img3 from "../assets/Client.png";
import img4 from "../assets/Lawyer.png";
import img5 from "../assets/Cases.png";

import { EvaultContext } from "../context/EvaulContext";

const DashboardItems = ({ img, title, link, count }) => (
  <div className="">
    <div className="p-3  justify-end items-end flex-col rounded-xl sm:w-72 w-full border-2 border-slate-400 mx-5 my-5 blue-glassmorphism">
      <div className="flex items-center justify-center">
        <img src={img} className="h-20 aspect-[3/2] "></img>
      </div>
      <div className="flex justify-center flex-col items-center text-white">
        <p className="text-xl font-bold">{title}</p>
        <p>
          No. of {title} :{count}
        </p>
      </div>
        <Link to={link} className="text-white mt-3 py-3 flex items-center justify-center border-2 rounded-lg border-gray-500 hover:border-purple-600 ">
          View {title}
        </Link>
    </div>
  </div>
);

const Dashboard = ({}) => {
  const { clientsArray, judgesArray, lawyersArray } = useContext(EvaultContext);
  return (
    <Layout>
      <h1 className="text-2xl text-center mt-3 font-bold text-white rounded-xl mx-7 bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 white-glassmorpism">
        DASHBOARD
      </h1>
      <div className="bg-[#0b0212] min-h-screen min-w-screen border-1  flex w-screen">
        <div className="flex flex-row mt-40">
          <DashboardItems
            img={img2}
            title="Judge"
            count={judgesArray.length}
            link="/judges"
          />
          <DashboardItems
            img={img3}
            title="Client"
            count={clientsArray.length}
            link="/clients"
          />
          <DashboardItems
            img={img4}
            title="Lawyer"
            count={lawyersArray.length}
            link="/lawyers"
          />
          <DashboardItems img={img5} title="Cases" link="/cases"/>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
