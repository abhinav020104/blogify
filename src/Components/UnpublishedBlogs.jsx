import { useRecoilValue } from "recoil"
import { userAtom } from "../Store/Atoms/user"
import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./Blog";
import Lottie from "lottie-react"
import loadingAnimation from "../assets/1709725446570.json"
const UnpublishedBlogs = ()=>{
    const user = useRecoilValue(userAtom);
    const [blogs , setBlogs] = useState([]);
    const [loading , setLoading] =  useState(true);
    const fetchData = async ()=>{
        try{
            const response =  await axios({
                method:"get",
                url:`http://localhost:4000/api/v1/blog/getunpublisheduserblogs/${user.id}`
            })
            console.log(response.data.data);
            setBlogs(response.data.data);
            setLoading(false);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchData();
    },[user]);
    return(
        <div className="flex flex-col w-[90%] mx-auto ">
        {
            loading === true &&(
                <div className="w-full flex items-center justify-center">
                    <div className="w-[800px] h-[100px]">
                        <Lottie animationData={loadingAnimation}></Lottie>
                    </div>
                </div>
            )
        }
        {
            loading === false && blogs.length !== 0 &&(
                    blogs.map((blog)=>{
                        return(
                            <Blog blogData = {blog}></Blog>
                        )
                    })
            )
        }
        {
            loading === false && blogs.length === 0 &&(
                <div className="flex w-full h-[500px] items-center justify-center font-bold text-black text-2xl">
                    You Have No UNPUBLISHED Blogs 
                </div>
            )
        }
        </div>
    )
}

export default UnpublishedBlogs