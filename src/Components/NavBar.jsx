import { CiMenuFries } from "react-icons/ci";
import "./NavBar.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {logout} from '../operations'

import { useSelector,useDispatch } from "react-redux"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  
  const logoutHandler=()=>{
    setIsOpen(false); 
    dispatch(logout()); 
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { token,user } = useSelector((state) => state.auth);
  return (
    
    <nav className="bg-gray-900 text-white ">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 w-[80%]">
    
        <div className="text-lg font-bold">
          <Link to="/" className="cursor-pointer">
            DealsDry 
          </Link>
        </div>
        
       
        <div className="md:hidden" onClick={toggleMenu}>
          <CiMenuFries className="text-2xl cursor-pointer" />
        </div>
       
       
        {token && <ul className={`fixed top-0 right-0 h-full w-2/3 bg-gray-800 md:gap-10 transition-transform duration-300 ease-in-out z-10 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:flex md:flex-row md:items-center md:bg-transparent md:w-auto md:h-auto md:translate-x-0`}>
           <li className="p-4 md:p-0 md:mx-3 text-center hover:bg-gray-700 md:hover:bg-transparent">
            <Link to="/" className="text-white font-medium cursor-pointer" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          
          <li className="p-4 md:p-0 md:mx-3 text-center hover:bg-gray-700 md:hover:bg-transparent">
            <Link to="/getEmployeeDetails" className="text-white font-medium cursor-pointer" onClick={() => setIsOpen(false)}>
              Employee List
            </Link>
          </li>

          <li className="p-4 md:p-0 md:mx-3 text-center hover:bg-gray-700 md:hover:bg-transparent">
            <Link to="/login"  className="text-white font-medium cursor-pointer" onClick={logoutHandler}>
              {user.username} - <button className="border p-[8px]">Logout</button>
            </Link>
           
          </li>
       
        </ul>
      }
      </div>
    </nav>
   
    
  );
};

export default Navbar;