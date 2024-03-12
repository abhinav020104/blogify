import JoditEditor from "jodit-react";
import { useRef, useState, useMemo, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../Store/Atoms/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const EditBlog = () => {
    const location = useLocation();
    const id = location.pathname.split("/").at(-1);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://blogify-ds91.onrender.com/api/v1/blog/fetchblog/${id}`);
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
        } catch (error) {
            console.log(error);
        }
    };

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title , setTitle] =  useState(''); 
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();

    const changeHandler = (value) => {
        setContent(value); 
    };

    const titleHandler = (e) => {
        setTitle(e.target.value);
    };

    const editorConfig = useMemo(() => ({
        buttons: [
            'source', '|',
            'bold',
            'strikethrough',
            'underline',
            'italic', '|',
            'ul',
            'ol', '|',
            'outdent', 'indent',  '|',
            'font',
            'fontsize',
            'link', '|',
            'align', 'undo', 'redo', '|',
            'hr',
            'eraser',
            'fullsize',
            'print',
        ],
        height: 500
    }), []);

    const validateInputs = () => {
        if (!title.trim()) {
            toast.error("Fields cannot be empty");
            return false;
        }
        if (!content.trim()) {
            toast.error("Fields cannot be empty");
            return false;
        }
        return true;
    };

    const saveHandler = async () => {
        if (!validateInputs()) return;

        try {
            toast.loading("Saving Changes");
            await axios.put(`https://blogify-ds91.onrender.com/api/v1/blog/editblog/${id}`, {
                title: title,
                content: content
            });
            toast.dismiss();
            toast.success("Blog edit successful");
            navigate("/myblogs/unpublishedblogs"); 
        } catch (error) {
            console.log(error);
            toast.error("Failed to edit blog");
        }
    };

    const exitHandler = async () => {
        try {
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col h-screen overflow-auto">
            <nav className="bg-slate-400 text-black p-2 font-mono">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">Edit Blog</h1>
                </div>
            </nav>

            <div className="container mx-auto flex-1">
                <form className=" mt-2 flex flex-col items-center justify-center gap-3">
                    <input type="text" placeholder="Enter title" name="title" className="text-black text-xl font-bold w-full border-b-2 border-black p-3" value={title} onChange={titleHandler}/>
                    <div className="w-full h-[500px]">
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={changeHandler}
                            config={editorConfig}
                        />
                    </div>
                </form>
            </div>

            <div className=" mb-10 flex justify-center gap-6 tracking-wider overflow-auto">
                <button onClick={saveHandler} className="bg-green-500 text-black p-2 w-[150px] rounded-md hover:scale-95 duration-200" >
                    Save
                </button>
                <button onClick={exitHandler} className="bg-red-500 text-black p-2 w-[150px] rounded-md hover:scale-95 duration-200">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default EditBlog;
