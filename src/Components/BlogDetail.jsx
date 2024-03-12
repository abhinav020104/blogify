import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { userAtom } from "../Store/Atoms/user";

const BlogDetail = () => {
    const location = useLocation(); 
    const id = location.pathname.split("/").at(-1);
    const user = useRecoilValue(userAtom);
    const [blog , setBlog] = useState({});
    const [loading , setLoading] = useState(true);
    const [ userComment , SetuserComment] = useState({});
    const [commentData , setCommentData] = useState("");
    const fetchData = async () => {
        toast.loading("Fetching blog Details")
        try {
            setLoading(true);
            const blogData = await axios({
                method: "get",
                url: `https://blogify-ds91.onrender.com/api/v1/blog/fetchblog/${id}`
            });
            const userCommentData = await axios({
                method:"post",
                url:"https://blogify-ds91.onrender.com/api/v1/comment/fetchusercomment",
                data:{
                    postId : id,
                    userId : user.id
                }
            })
            SetuserComment(userCommentData.data.data)
            console.log(userCommentData.data.data);
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
    }, [user]);

    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    const changeHandler = (e)=>{
        setCommentData(e.target.value)
    }
    
    const addCommentHandler = async()=>{
        try{
            toast.loading("Posting comment")
            const res = await axios({
                method:"post",
                url:"https://blogify-ds91.onrender.com/api/v1/comment/addcomment",
                data:{
                    content:commentData,
                    postId : id,
                    userId : user.id,
                    fName :  user.firstName,
                    LName  : user.lastName,
                }
            })
            await fetchData();
            toast.dismiss();
            toast.success("Comment added successfully")
        }catch(error){
            toast.dismiss()
            toast.error("Failed to add comment")
            console.log(error);
        }
    }
    
    const deleteCommentHandler = async(id)=>{
        try{
            toast.loading("Deleting comment"); 
            const res = await axios({
                method:"post",
                url:"https://blogify-ds91.onrender.com/api/v1/comment/deletecomment",
                data:{
                    id
                }
            })
            fetchData();
            toast.dismiss(); 
            toast.success("Comment deleted successfully");
        }catch(error){
            toast.dismiss();
            toast.error("Failed to delete comment");
        }
    }
    
    return (
        <div className="w-screen min-h-screen overscroll-y-auto flex flex-col">
            <Navbar />
            <div className="w-11/12 mx-auto mt-32">
                <div>
                    {
                        loading === false && (
                        <div>
                            <div className="border-b-2 border-black py-4 font-bold text-xl">{blog.title}</div>
                            <div dangerouslySetInnerHTML={createMarkup(blog.content)} className="text-black font-semibold py-4" />
                            <div className="w-full flex flex-col gap-2 mb-3">
                            {
                                loading  === false && userComment === null &&(
                                    <div className="w-full flex flex-col gap-6">
                                        <div className="text-black font-bold text-xl underline">
                                            Add Comment
                                        </div>
                                        <textarea name="comment" id="" cols="30" rows="5" className="border-[1px] border-black rounded-md p-4 text-black" placeholder="Write Your Comment" onChange={changeHandler}></textarea>
                                        <button className="w-[150px] p-2 font-bold text-black bg-red-500 font-mono rounded-md hover:scale-95 duration-200" onClick={addCommentHandler}>Post Comment</button>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                        )
                    }
                </div>
                <div>
                    {
                        loading === false  && blog.Comments.length !== 0 &&(
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                                {blog.Comments.map((comment) => (
                                    <div key={comment.id} className="border border-gray-200 rounded-md p-4 mb-4">
                                        <div className="flex justify-between items-center">
                                            <div className="font-semibold text-lg">{comment.userId === user.id ? "Your Comment" : `${comment.fName} ${comment.LName}`}</div>
                                            {comment.userId === user.id && (
                                                <button className="text-red-500 hover:text-red-700" onClick={() => deleteCommentHandler(comment.id)}>Delete</button>
                                            )}
                                        </div>
                                        <p className="mt-2">{comment.content}</p>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                    {
                        loading === false  && blog.Comments.length === 0 &&(
                            <div className="w-full mx-auto text-center font-bold text-xl text-black">
                                No Comments Found ...
                            </div>
                        )
                    }
                    {
                    loading === true &&(
                        <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert mb-20'>
                            <span className='sr-only'>Loading...</span>
                            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                            <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
