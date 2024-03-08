import axios from "axios"
import {useNavigate , useLocation} from "react-router-dom"
import toast from "react-hot-toast"; 
const 
Blog = ({blogData})=>{
    const location = useLocation();
    const navigate = useNavigate();
    const currPath = location.pathname.split("/").at(-1);
    const publishHandler = async()=>{
        try{
            console.log(blogData)
            const status = !blogData.published
            console.log(status);
            const response = await axios({
                method:"put",
                url:`https://blogify-backend.codewithabhinav.online/api/v1/blog/changepublishstatus/${blogData.id}/${status}`,
                data:{}
            })
            console.log(response);
            if(status){
                toast.success("Blog Published Successfully")
            }else{
                toast.success("Blog Unpublished Successfully");
            }
            navigate(`/myblogs/${currPath === "publishedblogs" ? "unpublishedblogs" : "publishedblogs"}`);
        }catch(error){
            console.log(error);
        }
    }
    const editHandler = async()=>{
        try{
            navigate(`/editblog/${blogData.id}`)
        }catch(error){
            console.log(error);
        }

    }
    const deleteHandler = async()=>{
        try{
            toast.loading("Deleting Blog");
            const response  = await axios({
                method:"delete",
                url:`https://blogify-backend.codewithabhinav.online/api/v1/blog/deleteblog/${blogData.id}`
            })
            console.log(response);
            toast.dismiss();
            toast.success("Blog Deleted Successfully");
            navigate("/myblogs/publishedblogs");
        }catch(error){
            console.log(error);
        }

    }
    return(
        <div className="flex flex-col w-full mx-auto  font-mono ">
            <div className="flex  w-full  justify-around text-black font-bold  border-b-2  border-slate-400 items-center">
                <div className=" p-4 flex w-[900px] justify-between ">{blogData.title}</div>
                <div className=" p-4 flex w-[250px] justify-between gap-6 tracking-wider">
                    <button className="bg-green-500 text-black p-2 rounded-md hover:scale-95 duration-200" onClick={publishHandler}>
                        {blogData.published === false ? `Publish` :  `Unpublish`}
                    </button>
                    <button className="bg-blue-500 text-black p-2 rounded-md hover:scale-95 duration-200" onClick={editHandler}>
                        Edit
                    </button>
                    <button className="bg-red-500 text-black p-2 rounded-md hover:scale-95 duration-200" onClick={deleteHandler}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Blog;