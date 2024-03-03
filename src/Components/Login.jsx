import Navbar from "./Navbar"
import LoginAnimation from "../assets/1709405739948.json"
import Lottie from "lottie-react"
function Login(){
    return(
        <div className="w-screen h-screen bg-white flex flex-col">
            <Navbar></Navbar>
            <div className=" w-screen h-full flex items-center justify-center gap-32">
                <div className="w-[350px]">
                    <Lottie animationData={LoginAnimation}/>
                </div>
                <div className="flex flex-col w-[500px] bg-slate-400 h-[500px] rounded-md">
                    <form className="flex flex-col h-full items-center gap-24">
                        <div className="text-2xl font-sans font-bold mt-6 tracking-normal">Login</div>
                        <div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login