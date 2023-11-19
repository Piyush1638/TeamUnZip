import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/InDashboard/Cases";
import Clients from "./pages/InDashboard/Clients";
import Lawyers from "./pages/InDashboard/Lawyers";
import Judges from "./pages/InDashboard/Judges";
import AddCase from "./pages/InDashboard/AddCase";
import AddClients from "./pages/InDashboard/AddClients";
import AddLawyer from "./pages/InDashboard/AddLawyer";
import AddJudge from "./pages/InDashboard/AddJudge";
import LoginAs from "./pages/LoginBoxas";
import LoginForEveryone from "./pages/LoginForEveryone";



const App = ()=>{
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginAs/>}></Route>
      <Route path="/LoginForEveryone" element={<LoginForEveryone></LoginForEveryone>}></Route>
        <Route path="/home" element={<HomePage/>} />
        {/* <Route path="/admin" element={<AdminPage/>} /> */}
        <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path='/cases' element={<Cases/>} />
      <Route path="/add-case" element={<AddCase/>}/>
      <Route path='/clients' element={<Clients/>} />
      <Route path="/add-client" element={<AddClients/>}/>
      <Route path='/lawyers' element={<Lawyers/>} />
      <Route path="/add-lawyer" element={<AddLawyer/>}/>
      <Route path='/judges' element={<Judges/>} />
      <Route path="/add-judge" element={<AddJudge/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
