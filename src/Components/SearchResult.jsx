import { useRecoilValue } from "recoil";
import { searchDataAtom, userAtom } from "../Store/Atoms/user";
import Navbar from "./Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchResult = () => {
    const navigate = useNavigate();
    const searchData = useRecoilValue(searchDataAtom);
    const user = useRecoilValue(userAtom);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            toast.loading("fetching search results");
            const response = await axios.post("https://blogify-ds91.onrender.com/api/v1/blog/searchblog", {
                title: searchData,
                id: user.id
            });
            toast.dismiss();
            setSearchResult(response.data.data);
            toast.success("search results fetched successfully");
            setLoading(false);
            console.log(response.data.data);
        } catch (error) {
            toast.dismiss();
            setLoading(false);
            toast.error("failed to fetch blogs");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user, searchData]);

    return (
        <div className="w-screen min-h-screen flex flex-col overflow-y-auto bg-slate-400">
            <Navbar />
            <div className="w-11/12 h-full mx-auto">
                {searchResult.length !== 0 && (
                    <div className="flex flex-col gap-6 mt-32">
                        {searchResult.map((blog, index) => (
                            <div key={index} className="border-b-2 border-slate-800 p-2">
                                <div className="font-bold text-2xl text-black cursor-pointer" onClick={() => navigate(`/blogdetail/${blog.id}`)}>
                                    {blog.title}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {searchResult.length === 0 && !loading && (
                    <div className="flex flex-col gap-6 mt-32 items-center justify-center h-[500px] text-2xl font-bold text-black">
                        No Blogs Found For Search Query...
                    </div>
                )}
                {loading && (
                    <div>
                        <div className="flex space-x-2 justify-center items-center bg-slate-400 h-screen dark:invert max-[650px]:hidden">
                            <span className="sr-only">Loading...</span>
                            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
                        </div>
                        <div className="hidden max-[650px]:flex w-screen mt-32 justify-center">
                            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResult;
