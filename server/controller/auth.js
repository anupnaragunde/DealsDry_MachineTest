const bcrypt = require("bcryptjs")
const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")


require("dotenv").config()



exports.signup = async (req, res) => {
  try {

    const {
     username,password,confirmPassword,sno
    } = req.body

    if (
      !username ||
      !password ||
      !confirmPassword ||
      !sno
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      })
    }
   

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and ConfirmPassword do not match. Please try again.",
      })
    }

    


   
    const hashedPassword = await bcrypt.hash(password, 10)


    const user = await User.create({
      username,
      password: hashedPassword,
      sno
    })

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    })
  }
}


exports.login = async (req, res) => {
    try {
      
      const { username, password } = req.body
  
      
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
  
      const user = await User.findOne({ username })
  
    
      if (!user) {
        return res.status(401).json({
          success: false,
          message: `User is not Registered`,
        })
      }
  
     
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { username: user.username, sno: user.sno},
          process.env.JWT_SECRET
        )
       
        user.token = token
        user.password = undefined
       
        res.status(200).json({
          success: true,
          token,
          user,
          message: `Login Success`,
        })
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }