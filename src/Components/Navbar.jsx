import {useNavigate} from "react-router-dom"
function Navbar(){
    const navigate = useNavigate();
    return(
        <div className="  bg-gray-300 h-[70px] w-screen border-b-2 border-black flex items-center justify-center">
            <div className="w-[87%] flex items-center h-full justify-between">
                <div className="text-slate-800 text-2xl font-xl font-bold font-mono cursor-pointer">Blogify</div>
                <div className="flex gap-12">
                    <button className="bg-slate-400 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold" onClick={()=>{
                        navigate("/login")
                    }}>Login</button>
                    <button className="bg-slate-400 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold" onClick={()=>{
                        navigate("/signup")
                    }}>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar