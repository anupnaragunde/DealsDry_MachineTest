const express = require("express");
const router = express.Router();

const { login,signup } = require("../controller/auth.js");
const { createEmp,updateEmp,getEmpDetails,getEmpDetail,deletetEmpDetail} = require("../controller/emp.js");
const { auth} = require("../middlewares/auth.js");

router.post("/createEmp",auth, createEmp);
router.get("/getEmpDetails",auth, getEmpDetails);
router.post("/getEmpDetail",auth, getEmpDetail);
router.delete("/deleteEmpDetail",auth, deletetEmpDetail);
router.put("/updateEmp",auth, updateEmp);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;



