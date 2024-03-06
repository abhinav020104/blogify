import { useRecoilValue } from "recoil"
import { searchDataAtom, userAtom } from "../Store/Atoms/user"
import Navbar from "./Navbar";
import axios from "axios";
import toast from "react-hot-toast"
import { useEffect, useState } from "react";
const SearchResult = ()=>{
    const searchData = useRecoilValue(searchDataAtom);
    const user = useRecoilValue(userAtom)
    console.log(searchData);
    const [searchResult , setSearchResult] = useState([]);
    const fetchData = async()=>{
        try{
            toast.loading("fetching search results")
            const response = await axios({
                method:"post",
                url:"http://localhost:4000/api/v1/blog/searchblog",
                data:{
                    title:searchData,
                    id:user.id
                }
            })
            toast.dismiss();
            setSearchResult(response.data.data);
            toast.success("search results fetched successfully");
            console.log(response.data.data);
        }catch(error){
            toast.dismiss();
            toast.error("failed to fetch blogs")
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchData();
    } , [user , searchData])
    return(
        <div className="w-screen min-h-screen flex-flex-col overflow-y-auto">
            <Navbar></Navbar>
            <div className="w-11/12 h-full">
                <div className="mt-32">
                </div>
            </div>
        </div>
    )
}


export default SearchResult