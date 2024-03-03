import Navbar from "./Navbar"
import LoginAnimation from "../assets/1709405739948.json"
import Lottie from "lottie-react"
import { useState } from "react"
import axios from "axios"
function Login(){
    const [loginData , setLoginData] =  useState({});
    const loginHandler = async()=>{
        try{
            const response = await axios({
                method:"post",
                url:"http://localhost:4000/api/v1/auth/login",
                data:loginData
            })
            console.log(response);
        }catch(error){
            console.log(error);
            alert("login failed");
            console.log("login frontend error");
        }
    }
    const changeHandler =  (e)=>{
        setLoginData({
            ...loginData,
            [e.target.name] : e.target.value
        })
    }
    return(
        <div className="w-screen h-screen bg-white flex flex-col">
            <Navbar></Navbar>
            <div className=" w-screen h-full flex items-center justify-center gap-32">
                <div className="w-[300px]">
                    <Lottie animationData={LoginAnimation}/>
                </div>
                <div className="flex flex-col w-[400px] bg-slate-400 h-[400px] rounded-md items-center">
                    <form className="flex flex-col  items-center gap-8 w-11/12">
                        <div className="text-2xl font-sans font-bold mt-6 tracking-normal">
                            Login
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <div className="font-semibold text-[16px] text-black">
                                Email
                            </div>
                            <div className="w-full">
                                <input type="text" name="email" placeholder="Enter email address"className=" h-[30px] w-full rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg"  onChange={changeHandler}/>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                        <div className=" font-semibold text-[16px] text-black">Password</div>
                    <input type="text" name="password" placeholder="Enter password " className=" h-[30px] w-full rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg" onChange={changeHandler}/>
                        </div>
                    </form>
                    <button className="bg-slate-700 text-white w-[125px] p-2 rounded-md hover:scale-95 duration-200 mt-12 cursor-pointer shadow-lg" onClick={loginHandler}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login