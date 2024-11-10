import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 
  empDetails: null,
  editEmpDetails: false,
}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setEmpDetails: (state, action) => {
      state.empDetails = action.payload;   
    },
    setEditEmpDetails: (state, action) => {
      state.editEmpDetails = action.payload;  
    },
    resetEmpState: (state) => {
      state.empDetails = null;
      state.editEmpDetails = false;
    },
  },
});

export const {
    setEmpDetails,
    setEditEmpDetails,
    resetEmpState,
} = courseSlice.actions

export default courseSlice.reducer