import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { apiConnector } from '../apiConnector';
import { endpoints } from '../api';
import { toast } from "react-hot-toast";
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux';
import { resetEmpState } from '../Slices/empDetails';
const GetEmpDetails = () => {
  const dispatch=useDispatch
  dispatch(resetEmpState())
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { GET_EMPDETAILS_API ,DELETE_EMPDETAIL_API} = endpoints;
 const navigate=useNavigate();
 const { token } = useSelector((state) => state.auth)
 const handleEdit=async(email)=>{
  navigate(`/updateEmployee/${email}`)
  const res = await apiConnector("GET", GET_EMPDETAILS_API, null, {
    Authorization: `Bearer ${token}`,
  });
  setEmployees(res.data.empDetails);
}
const handleDelete=async(email)=>{
   await apiConnector("DELETE", DELETE_EMPDETAIL_API,{email},{
    Authorization: `Bearer ${token}`,
  });
  toast.success("Employee Deleted Successfully");

  const res = await apiConnector("GET", GET_EMPDETAILS_API, null, {
    Authorization: `Bearer ${token}`,
  });
  setEmployees(res.data.empDetails);
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector("GET", GET_EMPDETAILS_API, null, {
          Authorization: `Bearer ${token}`,
        });
        setEmployees(response.data.empDetails);
       
      } catch (error) {
        console.log("GET_EMPDETAILS_API ERROR............", error);
        toast.error("Failed to fetch employee details");
      }
    };

    fetchData();
  },[]); 
  
  const filteredEmployees = employees.filter((emp) => {
    return (
      emp.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp._id.toString().includes(searchQuery)
    );
  });
  const createEmpHandler=()=>{
    navigate('/createEmployee');
  }
  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="container mx-auto p-6">
        <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <div >
            <p className="text-lg font-semibold text-gray-700">Total Count: {filteredEmployees.length}</p>
        
          </div>
          <div className="flex space-x-4">
          <Button text="Create Employee" onclick={createEmpHandler}/>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Search Keyword"
              className="p-2 w-64 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">Search</button>
          </div>
        </div>

        
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          {filteredEmployees.length === 0 ? (
            <p className="text-center text-gray-700 py-4">No Data Found</p> 
          ) : (
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">SI No</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Mobile No</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Designation</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Gender</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Create Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, index) => (
                  <tr key={emp._id} className="hover:bg-gray-50 transition duration-300">
                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4">
                      <img
                        src={emp.image}
                        alt={emp.username}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 shadow-md"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.mobileNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.designation}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.gender}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.course}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(emp.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600 transition duration-300" onClick={() => {
                     handleEdit(emp.email)
                    }}>Edit</button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                      onClick={()=>{
                        handleDelete(emp.email)}
                      }>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetEmpDetails;



