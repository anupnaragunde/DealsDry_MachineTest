import React from 'react'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { endpoints } from '../api'
import EmployeeForm from './EmployeeForm '
import { apiConnector } from '../apiConnector';
import { setEmpDetails,setEditEmpDetails } from '../Slices/empDetails'
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

const UpdateEmp = () => {
  const dispatch = useDispatch()
  const { email } = useParams()
  const {GET_EMPDETAIL_API}=endpoints;
  const { token } = useSelector((state) => state.auth)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector("POST", GET_EMPDETAIL_API, { email },
          {
            Authorization: `Bearer ${token}`,
          }
        );
       
  
     
        dispatch(setEditEmpDetails(true));
        dispatch(setEmpDetails(response.data.empDetails));
        console.log("response....", response.data.empDetails);
      
      } catch (error) {
        console.log("GET_EMPDETAILS_API ERROR............", error);
        toast.error("Failed to fetch employee details");
      }
    };
    fetchData();
  }, [email, dispatch]);
  return (
    <div>
      <h1 className='bg-yellow-500 p-[10px] text-center'>Edit Employee</h1>
      <EmployeeForm/>
    </div>
  )
}

export default UpdateEmp
