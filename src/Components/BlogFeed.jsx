import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenAtom, userAtom } from "../Store/Atoms/user";
import { useNavigate } from "react-router-dom";

const BlogFeed = () => {
    const [blogs, setBlogs] = useState([]);
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const [loading , setLoading] = useState(true);
    const token = useRecoilValue(tokenAtom);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://blogify-backend.codewithabhinav.online/api/v1/blog/fetchallblogs/${user.id}`);
            setBlogs(response.data.data);
            console.log(response.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {

        if (Object.keys(user).length !== 0) {
            fetchData();
        }
        if (token === null){
            fetchData()
        }
    }, [user]);


    return (
        <div className="w-11/12 mx-auto">
            <div className="w-full flex items-center justify-center mt-16 flex-col gap-3 mb-6">
                <div className="text-black font-bold text-xl">
                    Read On Trending Topics
                </div>
                <div className="w-[30%] border-b-2 border-slate-500"></div>
            </div>
            {
                loading === false && (
                    <div className="flex flex-col gap-6">
                        {blogs.map((blog, index) => (
                            <div key={index} className=" border-b-2 border-slate-400 p-2">
                                <div className="font-bold text-2xl text-black cursor-pointer" onClick={() => {
                                    navigate(`/blogdetail/${blog.id}`);
                                }}>{blog.title}</div>
                            </div>
                        ))}
                    </div>
                )
            }
            {
                loading === true &&(
                    <div class='flex space-x-2 justify-center items-center bg-slate-400  dark:invert h-full mt-16'>
                    <span class='sr-only'>Loading...</span>
                        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                    </div>
                )
            }
        </div>
    );
};

export default BlogFeed;
