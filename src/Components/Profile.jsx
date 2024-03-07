import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { userAtom , tokenAtom } from "../Store/Atoms/user";
import { useEffect, useState } from "react";
import NavBar from "./Navbar";  
import Lottie from "lottie-react"
import profileAnimation from "../assets/1707831870464.json"
function Profile(){
    const [visible  , setVisible] = useState(false);
    const [profileData , setProfileData] = useState({});
    const user = useRecoilValue(userAtom)
    return(
        <div className="w-screen h-screen bg-slate-500 flex flex-col ">
            <NavBar></NavBar>
            <div className="w-full flex items-center justify-center h-[70%] text-black font-bold text-ll select-none">
                <Lottie animationData={profileAnimation} className="w-[300px] h-[300px]"></Lottie>
                <div className="w-[500px] flex flex-col gap-4 justify-center items-between">
                    <div className=" flex ml-20 w-[80%] gap-12 justify-center items-center">
                        <div className="w-[105px]">First Name</div>
                        <div className="bg-slate-400 p-1 rounded-lg w-[40%] text-center select-none">{`${user.firstName}`}</div>
                    </div>
                    <div className=" flex ml-20 w-[80%] gap-12 justify-center items-center">
                        <div className="w-[105px]">Last Name</div>
                        <div className="bg-slate-400 p-1 rounded-lg w-[40%] text-center select-none">{`${user.lastName}`}</div>
                    </div>
                    <div className=" flex ml-20 w-full  gap-12 justify-center items-center">
                        <div className="w-[105px]">Mobile</div>
                        <div className="bg-slate-400 p-1 rounded-lg w-[52%] text-center select-none">{`${user.email}`}</div>
                    </div>
                </div>
        </div>
        </div>
    )
}


export default Profile;

