const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {cloudinaryConnect } = require("./config/cloudinary");

const empRoutes = require("./Routes/index");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use(express.json());

app.use("/api/v1", empRoutes);

cloudinaryConnect();

app.listen(PORT, () => {
  console.log(`Server is Listening at ${PORT}`);
});


const dbConnect = require("./config/dbconnect");
dbConnect();



