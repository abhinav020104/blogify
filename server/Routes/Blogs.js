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
router.get("/fetchallblogs/:id" , async(req , res)=>{
    const id = req.params.id
    try{
        if(id === undefined){
            return res.status(500).json({
                success:false,
                message:"failed to fetch all blogs "
            })
        }
        const allblogs = await prisma.post.findMany({
            where:{
                published:true,
                authorId:{
                    not:id
                }
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
                published:true,
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
                published:true,
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
router.delete("/deleteblog/:id" , async(req , res)=>{
    const id =  req.params.id;
    try{
        await prisma.post.delete({
            where:{
                id:id
            }
        })
        return res.status(200).json({
            success:true,
            message:"Blog deleted successfully",
        })
    }catch(error){
        console.log(error);
        return(500).json({
            success:false,
            message:"Failed to delete blog !",
        })
    }
})

router.put("/changepublishstatus/:id/:status" , async(req , res)=>{
    const id =  req.params.id;
    const status = req.params.status
    try{
        await prisma.post.update({
            data:{
                published:status === "true" ? true : false
            },
            where:{
                id:id
            }
        })
        return res.status(200).json({
            success:true,
            message:"published status changed successfully "
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:"Failed to publishblog"
        })
    }
})

router.post("/searchblog" , async(req , res)=>{
    const searchTitle = req.body.title;
    const id = req.body.id;
    try{
        const response = await prisma.post.findMany({
            where:{
                title:{
                    contains:searchTitle,
                },
                authorId:{
                    not:id
                }
            }
        })
        return res.status(200).json({
            success:true,
            message:"Blogs searched successfully",
            data:response
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to search blog"
        })
    }
})

router.put("/editblog/:id" , async(req , res)=>{
    const id = req.params.id;
    const {title , content} = req.body;
    try{
        const response = await prisma.post.update({
            data:{
                title:title,
                content:content,
            },
            where:{
                id:id
            }
        })
        return res.status(200).json({
            success:true,
            message:"Blog Edit Successfull",
            data:response,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to edit blog"
        })
    }
})
module.exports = router;
