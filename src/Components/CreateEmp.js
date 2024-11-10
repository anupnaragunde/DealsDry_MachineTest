import React from 'react'
import EmployeeForm from './EmployeeForm '
import { resetEmpState } from '../Slices/empDetails'
import { useDispatch } from 'react-redux'

const CreateEmp = () => {
  const dispatch=useDispatch()
  dispatch(resetEmpState())
  return (
    <div>
      <h1 className='bg-yellow-500 p-[10px] text-center'>Create Employee</h1>
      <EmployeeForm/>
    </div>
  )
}

export default CreateEmp
