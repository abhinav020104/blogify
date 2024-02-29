const express = require("express");
const app = express();
import { PrismaClient } from "@prisma/client";
const authRoutes = require("../server/Routes/Auth");
app.use(express.json()); 
app.get("/" , (req , res)=>{
    res.status(200).json({
        status:"up and running",
        message:"you landed on the test route"
    })
})
app.use("/api/v1/auth" , authRoutes);
app.listen(4000 , ()=>{
    console.log("server listening at port 4000");
})