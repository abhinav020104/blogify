import {useNavigate} from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hamburgermenuClickedAtom, tokenAtom } from "../Store/Atoms/user";
const HamburgerMenu = ()=>{
    const navigate =  useNavigate();
    const logoutHandler = ()=>{
        navigate("/logout"); 
        setHamburgerMenuClicked(false)
    }
    const token = useRecoilValue(tokenAtom)
    const setHamburgerMenuClicked = useSetRecoilState(hamburgermenuClickedAtom)
    return(
        <div>
            <div className="bg-blue-950 h-screen overflow-y-hidden">
                <div className="w-screen flex flex-col h-full opacity-70 items-center justify-center mt-5 gap-5 ">
                {
                    token === null  && (
                        <div className="">
                            <div className="flex gap-12 flex-col">
                                <button className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold" onClick={()=>{navigate("/login") ; setHamburgerMenuClicked(false)}}>Login</button>
                                <button className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold" onClick={()=>{navigate("/signup");  setHamburgerMenuClicked(false)}}>Signup</button>
                            </div>
                        </div>
                    )
                }
                {
                    token !== null &&(
                        <div className="w-screen flex flex-col h-full opacity-70 items-center justify-center mt-5 gap-5 ">
                            <button className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold " onClick={() =>{
                                    navigate("/myblogs/publishedblogs");
                                    setHamburgerMenuClicked(false);
                                }}>
                                    My Blogs
                                </button>
                                <button className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold tracking-wide" onClick={logoutHandler}>
                                    Logout
                            </button>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default HamburgerMenu