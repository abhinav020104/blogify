import BlogFeed from "./BlogFeed"
import Navbar from "./Navbar"
import Lottie from "lottie-react"
import homeAnimtation from "../assets/1709715860791.json"
import writingAnimation from "../assets/1709721096056.json"
import {useNavigate} from "react-router-dom"
import { useRecoilValue } from "recoil"
import { tokenAtom } from "../Store/Atoms/user"
function Home(){
    const navigate =  useNavigate();
    const token = useRecoilValue(tokenAtom);
    const clickHandler = ()=>{
        token === null ? navigate("/login") : navigate("/addblog")
    }
    return(
        <div className="bg-white w-screen  min-h-screen flex flex-col overflow-y-auto">
            <Navbar/>
            <div className="w-11/12 mx-auto h-full mt-24">
                <div className="w-full flex justify-center gap-32 items-center h-[300px] mt-6">
                    <div className="w-[30%]">
                        <Lottie animationData={homeAnimtation}></Lottie> 
                    </div>
                    <div className="flex flex-col items-center bg-slate-500 h-[350px] w-[350px] rounded-md justify-center gap-6 shadow-2xl">
                        <div className="text-xl text-black font-mono font-bold">
                            Write Your Blog Today...
                        </div>
                        <Lottie animationData={writingAnimation} className="w-[250px] h-[200px]"></Lottie>
                        <button className="bg-yellow-300 p-2 w-[200px] rounded-md font-mono text-black font-semibold hover:scale-95 duration-200 shadow-xl" onClick={clickHandler}>Start Writing</button>
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <BlogFeed></BlogFeed>
            </div>
        </div>
    )
}
 
export default Home