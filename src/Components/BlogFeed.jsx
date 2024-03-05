import axios from "axios";
import { useEffect, useState } from "react";

const BlogFeed = () => {
    const [blogs, setBlogs] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/blog/fetchallblogs");
            setBlogs(response.data.data);
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
