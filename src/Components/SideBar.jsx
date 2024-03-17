import {useLocation  , useNavigate} from "react-router-dom"
const SideBar = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const currPath = location.pathname.split("/").at(-1); 
    return(
        <div className="w-[15%] h-full border-r-2 border-black bg-slate-400 flex flex-col mt-[4.3rem] max-[400px]:w-[30%]">
            <div className={`text-black font-bold text-l p-2 border-b-2 border-black cursor-pointer hover:bg-slate-200 duration-100 text-center py-[10px] ${currPath === "publishedblogs" && `bg-blue-400`}`} onClick={()=>{navigate("/myblogs/publishedblogs")}}>
                    Published Blogs
            </div>
            <div className={`text-black font-bold text-l p-2 border-b-2 border-black cursor-pointer hover:bg-slate-200 duration-100 text-center py-[10px] ${currPath === "unpublishedblogs" && `bg-blue-400`}`} onClick={()=>{navigate("/myblogs/unpublishedblogs")}}>
                    Unpublished Blogs
            </div>
        </div>
    )
}
export default SideBar;