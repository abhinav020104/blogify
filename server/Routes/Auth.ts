const express = require("express");
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.post("/login" , async (req , res)=>{
    const {email , password} = req.body
    try{
        const userDetails = await prisma.user 
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while login"
        })
    }
})
module.exports = router;
