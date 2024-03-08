import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../Store/Atoms/user";
import { useNavigate } from "react-router-dom";

const BlogFeed = () => {
    const [blogs, setBlogs] = useState([]);
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://blogify-backend.codewithabhinav.online/api/v1/blog/fetchallblogs/${user.id}`);
            setBlogs(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        // Check if user is set and has non-zero size before fetching data
        if (Object.keys(user).length !== 0) {
            fetchData();
        }
    }, [user]);

    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <div className="w-11/12 mx-auto">
            <div className="w-full flex items-center justify-center mt-16 flex-col gap-3 mb-6">
                <div className="text-black font-bold text-xl">
                    Read On Trending Topics
                </div>
                <div className="w-[30%] border-b-2 border-slate-500"></div>
            </div>
            <div className="flex flex-col gap-6">
                {blogs.map((blog, index) => (
                    <div key={index} className=" border-b-2 border-slate-400 p-2">
                        <div className="font-bold text-2xl text-black cursor-pointer" onClick={() => {
                            navigate(`/blogdetail/${blog.id}`);
                        }}>{blog.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogFeed;
