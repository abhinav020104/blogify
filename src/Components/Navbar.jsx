import {useNavigate} from "react-router-dom"
import { useRecoilState, useRecoilValue , useSetRecoilState } from "recoil";
import { loadingAtom, searchDataAtom, tokenAtom, userAtom } from "../Store/Atoms/user";
import { useState } from "react";
function Navbar(){
    const navigate = useNavigate();
    const [token , setToken] = useRecoilState(tokenAtom);
    const loading = useRecoilValue(loadingAtom);
    const [user , setUser] = useRecoilState(userAtom);
    const setSearch =  useSetRecoilState(searchDataAtom)
    const logoutHandler = ()=>{
        navigate("/logout"); 
    }
    const [searchData , setSearchData] = useState("");
    const searchDataChangeHandler =(e)=>{
        setSearchData(e.target.value);
    }
    const searchClickHandler = ()=>{
        setSearch(searchData);
        navigate("/searchresults");
    }
    return(
        <div className="  bg-slate-400 h-[70px] w-screen border-b-2 border-black flex items-center justify-center fixed z-10">
            <div className="w-[94%] flex items-center h-full justify-between">
                <a href="/" className="text-slate-800 text-2xl font-xl font-bold font-mono cursor-pointer">Blogify</a>
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
                            <div className="flex gap-6 mr-56">
                                <input type="text" className=" w-[300px] p-2  rounded-md bg-slate-600 font-mono text-white" placeholder="search blogs.." name="search" onChange={searchDataChangeHandler}/>
                                <button className="font-xl text-white bg-slate-600 rounded-md p-3  hover:scale-95 duration-200" onClick={searchClickHandler}>Search</button>
                            </div>
                            <div className="font-bold text-black  text-[15px] tracking-wide">
                                {loading === false ? `welcome ! ${user.firstName} ${user.lastName}` : `Fetching details...`}
                            </div>
                            <div className="text-black flex gap-3">
                                <button className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold " onClick={() =>{
                                    navigate("/myblogs/publishedblogs")
                                }}>
                                    My Blogs
                                </button>
                                <button className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold  tracking-wide" onClick={()=>{
                                    navigate("/profile");
                                }}>
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