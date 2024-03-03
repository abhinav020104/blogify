import signUpAnimation from "../assets/1707740516213.json"
import Navbar from "./Navbar"
import Lottie from "lottie-react"
import axios from "axios" 
import { useState } from "react"
function Signup(){
    const [signUpData , setSignUpData] = useState({});
    const submitHandler = async()=>{
        try{
            const response = await axios({
                method:"POST",
                url:"http://localhost:4000/api/v1/auth/signup",
                data:signUpData
            })
            console.log(response);
        }catch(error){
            console.log(error);
            alert("failed to signup")
            console.log("Signup frontend error")
        }
    }
    const changeHandler = (e)=>{
        setSignUpData({
            ...signUpData,
            [e.target.name] : e.target.value
        })
    }
    return(
        <div className="bg-white w-screen h-screen flex flex-col">
            <Navbar></Navbar>
            <div className="w-screen h-full flex items-center justify-center gap-32">
                <div className="w-[500px]">
                    <Lottie animationData={signUpAnimation}></Lottie>
                </div>
                <div className="w-[500px] h-[500px] bg-slate-400 rounded-md shadow-xl flex flex-col  items-center">
                    <form className="flex flex-col items-center gap-6 w-11/12">
                        <div className="font-bold text-black text-xl tracking-wide mt-6">
                            SIGN UP
                        </div>
                        <div className="flex w-full items-center justify-between gap-8 mt-5">
                            <div className="flex flex-col justify-center gap-2">
                                <div className=" font-semibold text-[16px] text-black">First Name</div>
                                <input type="text" name="firstName" placeholder="Enter first name"  onChange={changeHandler}className=" h-[30px] w-[200px] rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg"/>
                            </div>
                            <div className="flex flex-col justify-center gap-2">
                                <div className=" font-semibold text-[16px] text-black">Last Name</div>
                                <input type="text" name="lastName"  placeholder="Enter last name"  onChange={changeHandler}className=" h-[30px] w-[200px] rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <div className="font-semibold text-[16px] text-black">
                                Email
                            </div>
                            <div className="w-full">
                                <input type="text" name="email" placeholder="Enter email address"  onChange={changeHandler}className=" h-[30px] w-full rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg" />
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-between gap-8">
                            <div className="flex flex-col justify-center gap-2">
                                <div className=" font-semibold text-[16px] text-black">Password</div>
                                <input type="text" name="password" placeholder="Enter password "  onChange={changeHandler}className=" h-[30px] w-[200px] rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg"/>
                            </div>
                            <div className="flex flex-col justify-center gap-2">
                                <div className=" font-semibold text-[16px] text-black">Confirm Password</div>
                                <input type="text" name="confirmpassword"  placeholder="Confirm password" onChange={changeHandler} className=" h-[30px] w-[200px] rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg" />
                            </div>
                        </div>
                    </form>
                        <button className="bg-slate-700 text-white w-[125px] p-2 rounded-md hover:scale-95 duration-200 cursor-pointer mt-12 shadow-lg" onClick={submitHandler}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Signup