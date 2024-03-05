import { useRecoilValue } from "recoil"
import { userAtom } from "../Store/Atoms/user"
import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./Blog";
const PublishedBlogs = ()=>{
    const user = useRecoilValue(userAtom);
    const [blogs , setBlogs] = useState([]);
    const fetchData = async ()=>{
        try{
            const response =  await axios({
                method:"get",
                url:`http://localhost:4000/api/v1/blog/getpublisheduserblogs/${user.id}`
            })
            console.log(response.data.data);
            setBlogs(response.data.data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchData();
    },[user]);
    return(
        <div className="flex flex-col w-[90%] mx-auto mt-2 ">
        {
            blogs.map((blog)=>{
                return(
                    <Blog blogData = {blog}></Blog>
                )
            })
        }
        </div>
    )
}

export default PublishedBlogs