import Navbar from "./Navbar"
import {useNavigate} from "react-router-dom"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { hamburgermenuClickedAtom } from "../Store/Atoms/user"
import HamburgerMenu from "./HamburgerMenu"
const MyBlogs = ()=>{
    const navigate = useNavigate();
    const hamburgerMenuClicked = useRecoilValue(hamburgermenuClickedAtom)
    return(
        <div className="flex flex-col w-screen h-screen">
            <Navbar></Navbar>
            {
                hamburgerMenuClicked === false &&(
                    <div className="h-full w-screen flex">
                        <SideBar></SideBar>
                        <div className="w-11/12 mt-20 overflow-y-scroll">
                            <Outlet></Outlet>
                        </div>  
                    </div>
                )       
            }
            {
                hamburgerMenuClicked === true &&(
                    <HamburgerMenu/>
                )
            }
        </div>
    )
}
export default MyBlogs;