const express = require("express");
const app = express();
const authRoutes = require("./Routes/Auth");
const blogRoutes = require("./Routes/Blogs");
app.use(express.json()); 
app.get("/" , (req , res)=>{
    res.status(200).json({
        status:"up and running",
        message:"you landed on the test route"
    })
})
app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/blog" , blogRoutes)
app.listen(4000 , ()=>{
    console.log("server listening at port 4000");
})