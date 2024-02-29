require("dotenv").config();
const express = require("express");
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken"); 
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require("bcrypt");
router.post("/login" , async (req , res)=>{
    const {email , password} = req.body
    try{
        const userDetails = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user not found please check credentials or signup"
            })
        }else{
            if(await bcrypt.compare(password , userDetails.password)){
                const payload = {
                    email:userDetails.email,
                    id:userDetails.id
                }
                const token =  await jwt.sign(payload , JWT_SECRET);
                userDetails.token =  token
                return res.status(200).json({
                    success:true,
                    message:"login successfull",
                    data:userDetails,
                })
            }
            return res.status(404).json({
                success:false,
                message:"Invalid credentials "
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while login"
        })
    }
})

router.post("/signup" , async (req, res)=>{
    const {email , firstName,lastName , password} = req.body
    try{
        const userDetails = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(userDetails){
            return res.status(500).json({
                success:false,
                message:"user already exists please login "
            })
        }else{
            const hashedPassword = await bcrypt.hash(password , 10);
            const newUser = await prisma.user.create({
                data:{
                    firstName:firstName,
                    lastName:lastName,
                    password:hashedPassword,
                    email:email
                }
            })
            return res.status(200).json({
                success:true,
                message:"User signup successfull",
                date:newUser
            })
        }
    }catch(error){
        console.log(error);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to signup"
        })
    }
})
module.exports = router;
