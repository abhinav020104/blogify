import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../Store/Atoms/user";

const BlogFeed = () => {
    const [blogs, setBlogs] = useState([]);
    const user = useRecoilValue(userAtom); 
    const fetchData = async () => {
        try {    
            const response = await axios.get(`http://localhost:4000/api/v1/blog/fetchallblogs/${user.id}`);
            setBlogs(response.data.data);
            console.log(response.data.data); 
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <div>
            {blogs.map((blog, index) => (
                <div key={index}>
                    <div>{blog.title}</div>
                    <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
                </div>
            ))}
        </div>
    );
};

export default BlogFeed;
