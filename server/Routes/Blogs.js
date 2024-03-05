const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
router.post("/addblog" , async(req , res)=>{
    const {userId , content ,  title , published} = req.body
    try{
        const newBlogDetails = await prisma.post.create({
            data:{
                title:title,
                content:content,
                authorId:userId,
                published: published ? published : false
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
                        firstName:true,
                        lastName:true
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
        const allblogs = await prisma.post.findMany({
            where:{
                published:false
            }
        });
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

router.get("/getpublisheduserblogs/:id" , async(req , res)=>{
    const id = req.params.id;
    try{
        const blogDetails = await prisma.post.findMany({
            where:{
                authorId:id,
                published:true,
            },
            select:{
                title : true,
                id:true,
            }
        })
        return res.status(200).json({
            success:true,
            message:"Published blogs fetched successfully",
            data:blogDetails,
        })
    }catch(error){
        console.log(error); 
        console.log("failed to fetch user blogs")
    }
})
router.get("/getunpublisheduserblogs/:id" , async(req , res)=>{
    const id = req.params.id;
    try{
        const blogDetails = await prisma.post.findMany({
            where:{
                authorId:id,
                published:false,
            },
            select:{
                title : true,
                id:true,
            }
        })
        return res.status(200).json({
            success:true,
            message:"Unpublished blogs fetched successfully",
            data:blogDetails,
        })
    }catch(error){
        console.log(error); 
        console.log("failed to fetch user blogs")
    }
})
module.exports = router;
