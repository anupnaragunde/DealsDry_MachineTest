const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
    //SIGNUP_API: BASE_URL + "/signup",
    LOGIN_API: BASE_URL + "/login",
    CREATE_EMP_API: BASE_URL + "/createEmp",
    UPDATE_EMP_API: BASE_URL + "/updateEmp",
    GET_EMPDETAILS_API : BASE_URL + "/getEmpDetails",
    GET_EMPDETAIL_API : BASE_URL + "/getEmpDetail",
    DELETE_EMPDETAIL_API : BASE_URL + "/deleteEmpDetail"
  }