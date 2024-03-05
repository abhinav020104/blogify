import JoditEditor from "jodit-react";
import { useRef, useState, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../Store/Atoms/user";
import axios from "axios";

const AddBlog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const user = useRecoilValue(userAtom);

    const changeHandler = (value) => {
        setContent(value); 
    }

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

    const draftHandler = () => {
        // Add functionality for saving draft
    }

    const publishHandler = () => {
        // Add functionality for publishing blog
    }

    const exitHandler = () => {
        // Add functionality for exiting
    } 

    return (
        <div className="flex flex-col h-screen overflow-auto">
            <nav className="bg-slate-400 text-black p-2 font-mono">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">Create a New Blog</h1>
                </div>
            </nav>

            <div className="container mx-auto flex-1">
                <form className=" mt-2 flex flex-col items-center justify-center gap-3">
                    <input type="text" placeholder="Enter title" className="text-black text-xl font-bold w-full border-b-2 border-black p-3" />
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
                <button onClick={exitHandler} className="bg-red-500 text-black p-2 w-[150px] rounded-md hover:scale-95 duration-200" >
                    Exit
                </button>
            </div>
        </div>
    );
}

export default AddBlog;
