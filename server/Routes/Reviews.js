const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/addreview" , async(req , res) =>{
    try{
        const {content , postId} = req.body;
        const response = await prisma.review.create({
            data:{
                content:content,
                postId:postId,   
            }
        })
        return res.status(200).json({
            success:true,
            message:"Review posted successfully !",
            data:response,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to post the review"
        })
    }
})

module.exports = router;