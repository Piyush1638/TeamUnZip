import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForEveryone = () => {
  const [id,setId] = useState('');
  const [password,setPassword] = useState('');
    const navigate = useNavigate();
  const handleLogin = () => {
    if (id === 'UnZip' && password === 'U@123') {
        navigate("/home");
    } else {
        alert("Wrong Id or Password!!");
    }
  };


  return (
    <div>
      <section className="bg-[#100817]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0  blue-glassmorphism bg-[#0b0212] border-custompurple">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-3xl text-white">
                SIGN in
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-md font-medium text-white"
                  >
                    Your Id
                  </label>
                  <input
                    type="text"
                    name="id"
                    placeholder="Enter your id"
                    className="border sm:text-sm rounded-lg text-md text-black block w-full p-2.5 bg-bg border-custompurple placeholder-custompurple  focus:ring-custompurple focus:border-custompurple"
                    required
                    value={id}
                    onChange={(e)=>setId(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-md font-medium  text-white"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="****"
                    className="border sm:text-sm rounded-lg text-md  block w-full p-2.5 bg-bg border-custompurple placeholder-custompurple text-black focus:ring-custompurple focus:border-custompurple"
                    required=""
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                
                <button
                  type="submit"
                  class="w-full text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center bg-custompurple hover:scale-105 focus:ring-custompurple"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForEveryone;