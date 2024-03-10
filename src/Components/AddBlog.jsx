import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenAtom, userAtom } from "../Store/Atoms/user";
import axios from "axios";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import { useRef, useState, useMemo } from "react";

const AddBlog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const token = useRecoilValue(tokenAtom);

    
    useEffect(() => {
        if (token  === null) {
            toast.error("Please login to write a blog !");
            navigate("/login");
        }
    }, [token, navigate]);

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
            'outdent', 'indent', '|',
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
        if (!title.trim() || !content.trim()) {
            toast.error("Fields cannot be empty");
            return false;
        }
        return true;
    };

    const handleBlogSubmission = async (published) => {
        if (!validateInputs()) return;

        try {
            if(published){
                toast.loading("Blog Publish in progress")
            }else{
                toast.loading("Saving Blog as draft")
            }
            const response = await axios.post("https://blogify-backend.codewithabhinav.online/api/v1/blog/addblog", {
                userId: user.id,
                title: title,
                content: content,
                published: published,
            });
            if (published) {
                toast.dismiss();
                toast.success("Blog published successfully");
                navigate("/myblogs/publishedblogs");
            } else {
                toast.dismiss();
                toast.success("Blog saved as draft");
                navigate("/myblogs/unpublishedblogs");
            }
        } catch (error) {
            console.error(error);
            toast.error(published ? "Failed to publish blog" : "Failed to save blog as draft");
        }
    };

    const draftHandler   = () => handleBlogSubmission(false);
    const publishHandler = () => handleBlogSubmission(true);

    const exitHandler = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col h-screen overflow-auto">
            <nav className="bg-slate-400 text-black p-2 font-mono">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">Create a New Blog</h1>
                </div>
            </nav>

            <div className="container mx-auto flex-1">
                <form className=" mt-2 flex flex-col items-center justify-center gap-3">
                    <input type="text" placeholder="Enter title" name="title" className="text-black text-xl font-bold w-full border-b-2 border-black p-3" onChange={titleHandler} />
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
                <button onClick={draftHandler} className="bg-green-500 text-black p-2 w-[150px] rounded-md hover:scale-95 duration-200" >
                    Save Draft
                </button>
                <button onClick={publishHandler} className="bg-blue-500 text-black p-2 w-[150px] rounded-md hover:scale-95 duration-200" >
                    Publish
                </button>
                <button onClick={exitHandler} className="bg-red-500 text-black p-2 w-[150px] rounded-md hover:scale-95 duration-200">
                    Exit
                </button>
            </div>
        </div>
    );
};

export default AddBlog;
