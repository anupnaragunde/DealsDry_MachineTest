import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { apiConnector } from '../apiConnector'; 
import { endpoints } from '../api';
import { toast } from "react-hot-toast"
import { useSelector,useDispatch } from 'react-redux';
import { resetEmpState } from '../Slices/empDetails';
import { useNavigate } from 'react-router';
const EmployeeForm = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  const { empDetails,editEmpDetails } = useSelector((state) => state.empDetails)
  const { token } = useSelector((state) => state.auth)
  const { register, handleSubmit, formState: { errors },setValue } = useForm();
  const { UPDATE_EMP_API, CREATE_EMP_API} =endpoints;
  const [previewSource, setPreviewSource] = useState()
  const [activity, setActivity] = useState('Create')
  useEffect(() => {
    const getEmp = async () => {
    
    if (editEmpDetails) {
      setActivity('Edit')
      setValue("username", empDetails.username)
      setValue("email", empDetails.email)
      setValue("mobileNo", empDetails.mobileNo)
      setValue("designation", empDetails.designation)
      setValue("gender", empDetails.gender)
      setValue("course", empDetails.course)
      setValue("image", empDetails.image)
     
      if(editEmpDetails){
  setPreviewSource(empDetails.image)} 
    }
  }
  getEmp()
}, [])
  const onSubmit = async (data) => {
    const toastId = toast.loading("Loading...")
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('mobileNo', data.mobileNo);
      formData.append('designation', data.designation);
      formData.append('gender', data.gender);
      formData.append('course', data.course); 
      formData.append('image', data.imgUpload[0]); 
      
   
      if(editEmpDetails){
        
        setLoading(true)
        await apiConnector("PUT", UPDATE_EMP_API, formData, {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        });
        setLoading(false)
        toast.success("Employee Edited Successful")
        dispatch(resetEmpState())
       

     setLoading(false); 
     
      }
      else{
        setLoading(true)
       await apiConnector("POST",CREATE_EMP_API , formData, {
        "Content-Type": "multipart/form-data", 
      
        Authorization: `Bearer ${token}`,
      });
      setLoading(false)
      toast.success("Employee Created Successful")
     
    
    }
    navigate('/getEmployeeDetails')
    } catch (error) {
      toast.error(`Could not ${activity} Employee`)
      console.log("Error in Employee Form",error)
    } 
   
    toast.dismiss(toastId)
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Employee Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            {...register('username', { required: 'Name is required' })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

       
        <div className="mb-4">
          <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">Mobile No</label>
          <input
            id="mobileNo"
            type="text"
            {...register('mobileNo', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit mobile number',
              },
            })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.mobileNo && <p className="text-red-500 text-xs">{errors.mobileNo.message}</p>}
        </div>

       
        <div className="mb-4">
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
          <select
            id="designation"
            {...register('designation', { required: 'Designation is required' })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <p className="text-red-500 text-xs">{errors.designation.message}</p>}
        </div>

        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="flex items-center space-x-4">
            <div>
              <input
                id="genderMale"
                type="radio"
                {...register('gender', { required: 'Gender is required' })}
                value="Male"
                className="mr-2"
              />
              <label htmlFor="genderMale" className="text-sm text-gray-700">Male</label>
            </div>
            <div>
              <input
                id="genderFemale"
                type="radio"
                {...register('gender', { required: 'Gender is required' })}
                value="Female"
                className="mr-2"
              />
              <label htmlFor="genderFemale" className="text-sm text-gray-700">Female</label>
            </div>
          </div>
          {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
        </div>

      
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Course</label>
          <div className="flex items-center space-x-4">
            <div>
              <input
                id="courseMCA"
                type="checkbox"
                {...register('course', { required: 'At least one course is required' })}
                value="MCA"
                className="mr-2"
              />
              <label htmlFor="courseMCA" className="text-sm text-gray-700">MCA</label>
            </div>
            <div>
              <input
                id="courseBCA"
                type="checkbox"
                {...register('course')}
                value="BCA"
                className="mr-2"
              />
              <label htmlFor="courseBCA" className="text-sm text-gray-700">BCA</label>
            </div>
            <div>
              <input
                id="courseBSC"
                type="checkbox"
                {...register('course')}
                value="BSC"
                className="mr-2"
              />
              <label htmlFor="courseBSC" className="text-sm text-gray-700">BSC</label>
            </div>
          </div>
          {errors.course && <p className="text-red-500 text-xs">{errors.course.message}</p>}
        </div>

        
        <div className="mb-4">
  <label htmlFor="imgUpload" className="block text-sm font-medium text-gray-700">
    Image Upload
  </label>
  <input
    id="imgUpload"
    type="file"
    accept=".jpg,.jpeg,.png"
    {...register('imgUpload', {
      required: !editEmpDetails ? 'Image is required' : false,
    })}
    className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    onChange={(e) => handleImageChange(e)}
  />
  {errors.imgUpload && <p className="text-red-500 text-xs">{errors.imgUpload.message}</p>}

 
  {( editEmpDetails) && (
    <img
      src={previewSource}
      alt="Preview"
      className="h-full w-full rounded-md object-cover mt-5"
    />
  )}
</div>

      
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
