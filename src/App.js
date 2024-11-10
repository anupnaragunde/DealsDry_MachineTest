import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Components/NavBar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import CreateEmp from "./Components/CreateEmp";
import UpdateEmp from "./Components/UpdateEmp";
import GetEmpDetails from "./Components/GetEmpDetails";
import PrivateRoute from "./PrivateRoute";
import Error from "./Error";
import OpenRoute from "./OpenRoute";


function App() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]); 

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/createEmployee" element={<PrivateRoute><CreateEmp /></PrivateRoute>} />
        <Route path="/updateEmployee/:email" element={<PrivateRoute><UpdateEmp /></PrivateRoute>} />
        <Route path="/getEmployeeDetails" element={<PrivateRoute><GetEmpDetails /></PrivateRoute>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;