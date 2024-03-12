const express = require("express");
const app = express();
const authRoutes = require("./Routes/Auth");
const blogRoutes = require("./Routes/Blogs");
const reviewRoutes = require("./Routes/Reviews");
const cors = require("cors"); 
app.use(express.json()); 
app.get("/" , (req , res)=>{
    res.status(200).json({
        status:"up and running",
        message:"you landed on the test route"
    })
})
app.use(cors());
app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/blog" , blogRoutes);
app.use("/api/v1/review",reviewRoutes);
app.listen(4000 , ()=>{
    console.log("server listening at port 4000");
})