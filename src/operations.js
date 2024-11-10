import { toast } from "react-hot-toast"
import { setLoading, setToken } from "./Slices/authSlice"
import { setUser } from "./Slices/authSlice"
import { apiConnector } from "./apiConnector"
import { endpoints } from "./api"


const {
    LOGIN_API,
   
  } = endpoints

  export function login(username, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          username,
          password,
        })
  
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        
        dispatch(setUser({ ...response.data.user}))
        localStorage.clear();
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate('/')
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Invalid Login Details")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function logout(navigate) {
    return (dispatch) => {
     
      dispatch(setToken(null))
      dispatch(setUser(null))

      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      
    }
  }