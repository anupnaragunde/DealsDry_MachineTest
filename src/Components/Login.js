
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch} from "react-redux";
import { login } from "../operations";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const { username, password } = data;
    dispatch(login(username, password,navigate));
 
  };

  return (
  
  
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="bg-gray-100 p-10 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         
            <div>
              <label className="block mb-1 text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className={`w-full p-3 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
  <label className="block mb-1 text-gray-700">Password</label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      className={`w-full p-3 border ${
        errors.password ? "border-red-500" : "border-gray-300"
      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
      {...register("password", {
        required: "Password is required",
        minLength: {
          value: 4,
          message: "Password must be at least 6 characters",
        },
      })}
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
  {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
  )}
</div>
            
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>

  );
};

export default LoginForm;