import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const BlogDetail = () => {
    const location = useLocation(); 
    const id = location.pathname.split("/").at(-1);
    console.log(id);
    const [blog , setBlog] = useState({});
    const [loading , setLoading] = useState(true);
    const fetchData = async () => {
        toast.loading("Fetching blog Details")
        try {
            setLoading(true);
            const blogData = await axios({
                method: "get",
                url: `https://blogify-ds91.onrender.com/api/v1/blog/fetchblog/${id}`
            });
            console.log(blogData);
            // const reviewData = await axios({
            //     method:"post",
            //     url:"",
            //     data:{

            //     }
            // })
            toast.dismiss();
            toast.success("Blog fetched successfully")
            setLoading(false);  
            setBlog(blogData.data.data);
        } catch (error) {
            toast.dismiss(); 
            console.log(error); 
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <div className="w-screen min-h-screen overscroll-y-auto flex flex-col">
            <Navbar />
            <div className="w-11/12 mx-auto mt-32">
                <div className="border-b-2 border-black py-4 font-bold text-xl">{blog.title}</div>
                <div dangerouslySetInnerHTML={createMarkup(blog.content)} className="text-black font-semibold py-4" />
                <div className="w-full flex flex-col gap-2 mb-3">
                    <div className="text-black font-bold text-xl underline">
                        Add Comment
                    </div>
                    <textarea name="comment" id="" cols="30" rows="5" className="border-[1px] border-black rounded-md p-4 text-black" placeholder="Write Your Comment"></textarea>
                    <button className="w-[150px] p-2 font-bold text-black bg-red-500 font-mono rounded-md hover:scale-95 duration-200">Post Comment</button>
                </div>
                <div>
                    {
                        loading === false  && blog.Comments.length !== 0 &&(
                            blog.Comments.map((comment)=>{
                                return(
                                    <div>
                                        {comment.content}
                                    </div>
                                )
                            })
                        )
                    }
                    {
                        loading === false  && blog.Comments.length === 0 &&(
                            <div className="w-full mx-auto text-center font-bold text-xl text-black">
                                No Comments Found ...
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
