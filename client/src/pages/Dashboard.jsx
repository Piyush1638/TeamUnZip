import React from "react";
import Layout from "../components/Layout";

const AdminDashboard = ({ title, classprop }) => (
  <div className="p-3  justify-end items-end flex-col rounded-xl h-40 sm:w-72 w-full border-2 border-slate-400 mx-5 my-5 white-glassmorphism">
    <div className="flex items-center justify-center">
      <img src={img1} className="h-20 aspect-[3/2] "></img>
    </div>
    <div className="flex justify-center items-center text-white">JUDGES</div>
    <div className="flex justify-center items-center text-white">
      Total Judges: 30
    </div>
  </div>
);

const Dashboard = ({}) => {
  return (
    <Layout>
      <div className="bg-[#0b0212] h-screen w-full">
        <h1 className="text-white">Dashboard</h1>
      </div>
    </Layout>
  );
};

export default Dashboard;
