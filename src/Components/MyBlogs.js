import Navbar from "./Navbar"
import {useNavigate} from "react-router-dom"
const MyBlogs = ()=>{
    const navigate = useNavigate();
    return(
        <div className="flex flex-col w-screen h-screen">
            <Navbar></Navbar>
            <div className="h-full w-screen flex">
                <div className="w-[15%] border-r-2 border-black bg-slate-400 flex flex-col ">
                    <div className=" text-black font-bold text-l p-2 border-b-2 border-black cursor-pointer hover:bg-slate-200 duration-100 " onClick={()=>{
                        navigate("/publishedblogs")
                    }}>
                        Published Blogs
                    </div>
                    <div className=" text-black font-bold text-l p-2 border-b-2 border-black cursor-pointer hover:bg-slate-200 duration-100 " onClick={()=>{
                        navigate("/unpublishedblogs")
                    }}>
                        Unpublished Blogs
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBlogs;