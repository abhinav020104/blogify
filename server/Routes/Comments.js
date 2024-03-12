const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/addcomment" , async(req , res) =>{
    try{
        const {content , postId , userId} = req.body;
        const response = await prisma.comment.create({
            data:{
                content:content,
                postId:postId, 
                userId
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

router.post("/fetchusercomment" , async(req,res)=>{
    try{
        const {postId , userId} = req.body
        const commentData = await prisma.comment.findFirst({
            where:{
                postId :postId,
                userId : userId,
            }
        })
        return res.status(200).json({
            success:true,
            message:"user comment fetched successfully",
            data:commentData
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to fetch comment"
        }
        )
    }
})

module.exports = router;