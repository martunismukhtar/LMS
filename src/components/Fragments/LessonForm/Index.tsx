'use client'
import { create } from "@/actions/course/LessonAction";
import Button from "@/components/Elements/button";
import RichEditor from "@/components/Elements/Editor/Index";
import InputForm from "@/components/Elements/input/Index";
import LoadingButton from "@/components/Elements/loading/LoadingButton";
import InputToogle from "@/components/Elements/toogle/InputToogle";
import { returnMessageState } from "@/Jotai/atom";
import { useAtom } from "jotai";
import { useActionState, useEffect, useState } from "react";

interface Props {
    module_id: string    
}
const LessonForm = (props: Props) => {    
    const [, setReturnMessage] = useAtom(returnMessageState);
    const [content, setContent] = useState("");
    const [data, setData] = useState({
        module_id: props.module_id,
        title: "",
        description: "",
        content: "",
        video_url: "",
        duration: "",
        is_published: false
    });
    const [editorKey, setEditorKey] = useState(0);
    const [state, actionForm, isPending] = useActionState(create, null);

    useEffect(() => {

        if (state?.status === "error" || state?.status === "success") {
            setReturnMessage({
              message: String(state?.message) || "",
              visible: true,
              type: state?.status || undefined,
            });
        }

        if (state?.status === "success") {
            setData({
                module_id: props.module_id,
                title: "",
                description: "",
                content: "",
                video_url: "",
                duration: "",
                is_published: false
            });
            setEditorKey(prevKey => prevKey + 1);
        }
    }, [state, setReturnMessage, props.module_id]);

    return (
        <div>
            <h1>Lesson Form</h1>
            <form action={actionForm}>                
                <input type="hidden" name="module_id" value={data.module_id} />
                <input type="hidden" name="content" value={content} />
                <InputForm label="Title" name="title" 
                    type="text" 
                    placeholder="Title" 
                    required={true} 
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    />
                <InputForm label="Description" name="description" 
                    type="text" 
                    placeholder="Description" 
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    />
                <InputForm label="Video URL" name="video_url" 
                    type="text"
                    placeholder="Video URL"
                    value={data.video_url}
                    onChange={(e) => setData({ ...data, video_url: e.target.value })}
                    />    
                <RichEditor 
                    key={editorKey} 
                    value={data.content} 
                    onChange={(e) => setContent(e)} />
                    <br />
                    <br />
                <InputForm label="Duration" name="duration" 
                    type="number" 
                    placeholder="Duration"                     
                    value={data.duration}
                    onChange={(e) => setData({ ...data, duration: e.target.value })}
                    />
                <InputToogle label="Published" name="is_published" 
                    value={data.is_published}
                    onChange={(e) => setData({ ...data, is_published: e.target.checked })}                    
                />
                <div className="flex justify-end mt-2">
                    <Button className="btn-dark me-2" type="button" onClick={() => window.history.back()}>Back</Button>
                    {isPending ? <LoadingButton /> : <Button className="btn-default" type="submit">Submit</Button>}                    
                </div>
            </form>
        </div>
    );
};
export default LessonForm