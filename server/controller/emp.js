const Emp = require("../models/Emp")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
exports.createEmp = async (req, res) => {
    try {
        
      const {
       username,email,mobileNo,designation,gender,course
      } = req.body
     
      if (
        !username ||
        !email||
        !mobileNo ||
        !designation||
        !gender ||
        !course 
      ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        })
      }
     
      const existingUser = await Emp.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Employee already exists.",
        })
      }
      
      let image=undefined
      if (req.files) {
          const user_img = req.files.image
          const userimage = await uploadImageToCloudinary(
              user_img,
            process.env.FOLDER_NAME
          )
           image= userimage.secure_url
          
        }
        else{
          return res.status(500).json({
              success: false,
              message: "Coould not find Img file",
            })
        }
      
      const user = await Emp.create({
        username,email,mobileNo,designation,gender,course,image
      })
      
      return res.status(200).json({
        success: true,
        user,
        message: "Emp registered successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Emp cannot be registered. Please try again.",
      })
    }
  }


  exports.updateEmp = async (req, res) => {
    try {
      const {
        username, email, mobileNo, designation, gender, course
      } = req.body;
  
    
  
      
      if (!username || !email || !mobileNo || !designation || !gender || !course) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        });
      }
  
    
      let image = undefined;
      
      
      if (req.files && req.files.image) {
        const user_img = req.files.image;
        const userimage = await uploadImageToCloudinary(user_img, process.env.FOLDER_NAME);
        image = userimage.secure_url;
      }
  
      
      const existingEmp = await Emp.findOne({ email });
      if (!existingEmp) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
  
     
      const updatedEmp = await Emp.findOneAndUpdate(
        { email }, 
        { 
          $set: { username, email, mobileNo, designation, gender, course, image }
        },
        { new: true }
      );
  
     
      if (!updatedEmp) {
        return res.status(500).json({
          success: false,
          message: "Failed to update employee",
        });
      }
  
      return res.status(200).json({
        success: true,
        updatedEmp,
        message: "Employee updated successfully",
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  
  exports.getEmpDetails = async (req, res) => {
    try {
      const empDetails = await Emp.find()
  
      return res.status(200).json({
        success: true,
        empDetails,
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Fetch Emp Data`,
      })
    }
  }

  exports.getEmpDetail = async (req, res) => {
    try {
      const {email}=req.body
     
      if(!email){
      return res.status(404).json({
        success: false,
        message: `All Fields are required`,
      })
      }
      const empDetails = await Emp.findOne({email})
      return res.status(200).json({
        success: true,
        empDetails,
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Fetch Emp Data`,
      })
    }
  }

  exports.deletetEmpDetail = async (req, res) => {
    try {
      const {email}=req.body
      
      if(!email){
      return res.status(404).json({
        success: false,
        message: `All Fields are required`,
      })
      }
     await Emp.findOneAndDelete ({email})
      return res.status(200).json({
        success: true,
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Delete Emp Data`,
      })
    }
  }