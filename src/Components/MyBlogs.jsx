import Navbar from "./Navbar"
import {useNavigate} from "react-router-dom"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"
const MyBlogs = ()=>{
    const navigate = useNavigate();
    return(
        <div className="flex flex-col w-screen h-screen">
            <Navbar></Navbar>
            <div className="h-full w-screen flex">
                <SideBar></SideBar>
                <div className="w-11/12 mt-20">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}
export default MyBlogs;