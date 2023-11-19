import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import HomeImg from "../assets/HomeImage.png";
import { EvaultContext } from "../context/EvaulContext";
import { Link } from "react-router-dom";
const HomePage = () => {
  const { connectWallet, currentAccount, isConnected } =
    useContext(EvaultContext);
  console.log("Current Account:", currentAccount);
  return (
    <div className="min-h-full relative">
      <Navbar />
      <section className="bg-[#0b0212] h-screen">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
              Experience the security and transparency in legal records!
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Online Block Chain based E-Vault to handle all the Legal Records..
            </p>
            {!currentAccount ? (
              <button
                type="submit"
                onClick={connectWallet}
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Connect wallet
              </button>
            ) : (
              isConnected && (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                >
                  Go to Dashboard
                </Link>
              )
            )}
          </div>
          <div className=" lg:mt-0 lg:col-span-5">
            <img src={HomeImg} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
