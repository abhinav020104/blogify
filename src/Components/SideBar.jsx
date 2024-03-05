import {useNavigate} from "react-router-dom"
const SideBar = ()=>{
    const navigate = useNavigate();
    return(
        <div className="w-[15%] h-full border-r-2 border-black bg-slate-400 flex flex-col ">
            <div className=" text-black font-bold text-l p-2 border-b-2 border-black cursor-pointer hover:bg-slate-200 duration-100 " onClick={()=>{navigate("/myblogs/publishedblogs")}}>
                    Published Blogs
            </div>
            <div className=" text-black font-bold text-l p-2 border-b-2 border-black cursor-pointer hover:bg-slate-200 duration-100 " onClick={()=>{navigate("/myblogs/unpublishedblogs")}}>
                    Unpublished Blogs
            </div>
        </div>
    )
}
export default SideBar;