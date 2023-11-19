import img1 from "../assets/UnZipPic1.png";
const NavbarItem = ({ title, classprop }) => {
  return <li className={`mx-4 cursor-pointer ${classprop}`}>{title}</li>;
};

const AdminDashboard = ({ title, classprop }) => (
  <div className="p-3  justify-end items-end flex-col rounded-xl h-40 sm:w-72 w-full border-2 border-slate-400 mx-5 my-5 white-glassmorphism">
    <div className="flex items-center justify-center">
      <img src={img1} className="h-20 aspect-[3/2] "></img>
    </div>
    <div className="flex justify-center items-center text-white">JUDGES</div>
    <div className="flex justify-center items-center text-white">Total Judges: 30</div>
  </div>
);

// const AdminItems = ({ title, titleName, titleId }) => (
//   <div className="p-5  justify-center items-center flex-col rounded-xl h-40 sm:w-72 w-full border-2 border-slate-400 mx-5 my-5 white-glassmorpism">
//     <img src={img1} className="h-20 justify-center items-center"></img>
//     <div>Judge Name : XYZ</div>
//     <div>Judge ID : XYZ</div>
//   </div>
// );

const AdminPage = () => {
  return (
    <div className="bg-[#0b0212] h-screen w-full">
      <nav className="w-full h-[5rem]  flex md:justify-center lg:justify-center sm:justify-center items-left p-4 bg-gradient-to-r from-[#040429] via-[#1b012e] to-[#0b0212]">
        <ul className="text-white flex list-none justify-between flex-row items-center flex-initial ">
          {["Cases", "Judge", "Lawer", "Client"].map((item, index) => (
            <NavbarItem key={item + index} title={item} />
          ))}
        </ul>
        <li className="bg-blue-500 py-2 px-7 p-3 mx-4 flex justify-right items-center rounded-full">
          ADMINISTRATOR
        </li>
      </nav>
      {/* <AdminItems /> */}
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
