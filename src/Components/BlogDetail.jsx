import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

const BlogDetail = () => {
    const location = useLocation(); 
    const id = location.pathname.split("/").at(-1);
    console.log(id);
    const [blog , setBlog] = useState({});
    
    const fetchData = async () => {
        try {
            const blogData = await axios({
                method: "get",
                url: `http://localhost:4000/api/v1/blog/fetchblog/${id}`
            });
            setBlog(blogData.data.data);
        } catch (error) {
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
            </div>
        </div>
    );
};

export default BlogDetail;
