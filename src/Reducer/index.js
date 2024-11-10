import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../Slices/authSlice"

import empDetailsReducer from "../Slices/empDetails"


const rootReducer  = combineReducers({
    auth: authReducer,
   
    empDetails:empDetailsReducer,
   
})

export default rootReducer