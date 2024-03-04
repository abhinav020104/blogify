import {useNavigate} from "react-router-dom"
import { useRecoilCallback, useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { loadingAtom, tokenAtom, userAtom } from "../Store/Atoms/user";
function Navbar(){
    const navigate = useNavigate();
    const [token , setToken] = useRecoilState(tokenAtom);
    const loading = useRecoilValue(loadingAtom);
    const [user , setUser] = useRecoilState(userAtom);
    const logoutHandler = ()=>{
        setUser({});
        localStorage.clear();
        setToken(null); 
    }
    return(
        <div className="  bg-slate-400 h-[70px] w-screen border-b-2 border-black flex items-center justify-center">
            <div className="w-[94%] flex items-center h-full justify-between">
                <div className="text-slate-800 text-2xl font-xl font-bold font-mono cursor-pointer">Blogify</div>
                {
                    token === null  && (
                        <div>
                            <div className="flex gap-12">
                                <button className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold" onClick={()=>{navigate("/login")}}>Login</button>
                                <button className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold" onClick={()=>{navigate("/signup")}}>Signup</button>
                            </div>
                        </div>
                    )
                }
                {
                    token !== null &&(
                        <div className="flex justify-between items-center gap-10 text-black">
                            <div className="font-bold text-black  text-[15px] tracking-wide">
                                {loading === false ? `welcome ! ${user.firstName} ${user.lastName}` : `Fetching details...`}
                            </div>
                            <div className="text-black flex gap-3">
                                <button className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold " onClick={() =>{
                                    navigate("/myblogs")
                                }}>
                                    My Blogs
                                </button>
                                <button className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold  tracking-wide">
                                    Profile
                                </button>
                                <button className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold tracking-wide" onClick={logoutHandler}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar