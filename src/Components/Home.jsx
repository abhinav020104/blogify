import BlogFeed from "./BlogFeed"
import Navbar from "./Navbar"
import Lottie from "lottie-react"
import homeAnimtation from "../assets/1709715860791.json"
import writingAnimation from "../assets/1709721096056.json"
import {useNavigate} from "react-router-dom"
function Home(){
    const navigate =  useNavigate();
    const clickHandler = ()=>{
        navigate("/addblog");
    }
    return(
        <div className="bg-white w-screen  min-h-screen flex flex-col overflow-y-auto">
            <Navbar/>
            <div className="w-11/12 mx-auto h-full mt-24">
                <div className="w-full flex justify-center gap-32 items-center h-[350px]">
                    <div className="w-[30%]">
                        <Lottie animationData={homeAnimtation}></Lottie> 
                    </div>
                    <div className="flex flex-col items-center bg-slate-500 h-full w-[350px] rounded-md justify-center gap-6">
                        <div className="text-xl text-black font-mono font-bold">
                            Write Your Blog Today...
                        </div>
                        <Lottie animationData={writingAnimation} className="w-[250px] h-[200px]"></Lottie>
                        <button className="bg-yellow-300 p-2 w-[200px] rounded-md font-mono text-black font-semibold hover:scale-95 duration-200" onClick={clickHandler}>Start Writing</button>
                    </div>
                </div>
            </div>
            <BlogFeed></BlogFeed>
        </div>
    )
}
 
export default Home