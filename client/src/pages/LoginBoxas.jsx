import { useNavigate } from "react-router-dom";

const commonStyles =
  "min-h-[70px] sm:px-2 px-2 m-2 rounded-xl w-20  border-2 border-slate-400 sm:min-w-[120px] flex justify-center items-center  border-[0.5px] border-gray-400 text-sm font-light text-white hover:border-purple-500 hover:text-purple-500";

const LoginBoxas=()=> {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen relative w-full p-20 justify-center items-center bg-[#0b0212]">
      <div className="p-1 justify-center items-center flex flex-col rounded-xl h-full    my-20 bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 white-glassmorpism  ">
        <div className="bg-black h-full w-full flex flex-col justify-center  p-5  items-center rounded-lg">
            <div className="text-5xl text-purple-500 font-bold">CONNECT AS </div>
            <div className="flex flex-row  mx-1 p-5">
                <div  onClick={()=>navigate("./LoginForEveryone")} className={` ${commonStyles}`}>ADMIN</div>
                <div onClick={()=>navigate("./LoginForEveryone")} className={commonStyles}>JUDGE</div>
                <div onClick={()=>navigate("./LoginForEveryone")} className={`  ${commonStyles}`}>LAWYER</div>
                <div onClick={()=>navigate("./LoginForEveryone")} className={` ${commonStyles}`}>CLIENT</div>
            </div>
        </div>
        
        
        </div>

    
    </div>
  )
}

export default LoginBoxas;