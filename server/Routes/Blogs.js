const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
router.post("/addblog" , async(req , res)=>{
    const {userId , content ,  title} = req.body
    try{
        const newBlogDetails = await prisma.post.create({
            data:{
                title:title,
                content:content,
                authorId:userId
            }
        })
        return res.status(200).json({
            success:true,
            message:"blog created successfully !",
            data:newBlogDetails,
        })
    }catch(error){
        console.log(error);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create blog"
        })
    }
})

router.post("/updateblog" , async(req , res)=>{
    try{
        const {blogId , newTitle , newContent} = req.body;
        const updatedBlogDetails = await prisma.post.update({
            where:{
                id:blogId,
            },
            data:{
                title:newTitle,
                content:newContent
            }
        })
        return res.status(200).json({
            success:true,
            message:"Blog Update successfull"  ,
            data:updatedBlogDetails 
        })

    }catch(error){
        console.log(error);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"failed to update the blog"
        })
    }
})

router.get("/fetchblog/:id" , async(req , res)=>{
    const blogId = req.params.id;
    console.log(blogId);
    try{
        const blog = await prisma.post.findUnique({
            where:{
                id:blogId
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        if(!blog){
            return res.status(404).json({
                success:false,
                message:"invalid blog id please verify",
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"Blog fetched successfully ",
                data:blog,
            })
        }
    }catch(error){
        console.log(error);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error while fetching blog "
        })
    }
})
router.get("/fetchallblogs" , async(req , res)=>{
    try{
        const allblogs = await prisma.post.findMany({});
        return res.status(200).json({
            success:true,
            message:"all blogs fetched successfully ",
            data:allblogs
        })
    }catch(error){
        console.log(error);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"failed to fetch all blogs "
        })
    }
})
module.exports = router;
