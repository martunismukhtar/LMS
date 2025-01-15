'use client'
import { edit } from "@/actions/course/LessonAction";
import Button from "@/components/Elements/button";
import RichEditor from "@/components/Elements/Editor/Index";
import InputForm from "@/components/Elements/input/Index";
import LoadingButton from "@/components/Elements/loading/LoadingButton";
import InputToogle from "@/components/Elements/toogle/InputToogle";
import { returnMessageState } from "@/Jotai/atom";
import { useAtom } from "jotai";
import { useActionState, useEffect, useState } from "react";

interface Props {
    lesson_id: string
    // data:{
    //     module_id: string
    //     id: string
    //     title: string,
    //     description: string,
    //     content: string,
    //     video_url: string,
    //     duration: string,
    //     is_published: boolean
    // }
    
}
const EditLessonForm = (props: Props) => {    
    const [, setReturnMessage] = useAtom(returnMessageState);
    const [content, setContent] = useState("");
    const [lesson, setData] = useState({        
        module_id: "",
        title: "",
        description: "",
        content: "",
        video_url: "",
        duration: "",
        is_published: false
    });
    
    const [state, actionForm, isPending] = useActionState(edit, null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lesson/${props.lesson_id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data[0]);
            setData({
                module_id: data[0].module_id,
                title: data[0].title,
                description: data[0].description,
                content: data[0].content,
                video_url: data[0].video_url,
                duration: data[0].duration,
                is_published: data[0].is_published ? true : false
            })
        })
        .catch((err) => console.error("Error fetching products:", err));
    }, [props.lesson_id]);

    useEffect(() => {
        if (state?.status === "error" || state?.status === "success") {
            setReturnMessage({
              message: String(state?.message) || "",
              visible: true,
              type: state?.status || undefined,
            });
        }        
    }, [state, setReturnMessage]);

    return (
        <div>
            <h1>Lesson Form</h1>
            <form action={actionForm}>
                <input type="hidden" name="id" value={props.lesson_id} />
                <input type="hidden" name="module_id" value={lesson.module_id} />
                <input type="hidden" name="content" value={content} />
                <InputForm label="Title" name="title" 
                    type="text" 
                    placeholder="Title" 
                    required={true} 
                    value={lesson.title}
                    onChange={(e) => setData({ ...lesson, title: e.target.value })}
                    />
                <InputForm label="Description" name="description" 
                    type="text" 
                    placeholder="Description" 
                    value={lesson.description}
                    onChange={(e) => setData({ ...lesson, description: e.target.value })}
                    />
                <InputForm label="Video URL" name="video_url" 
                    type="text"
                    placeholder="Video URL"
                    value={lesson.video_url}
                    onChange={(e) => setData({ ...lesson, video_url: e.target.value })}
                    />                     
                <RichEditor                     
                    value={lesson.content}                     
                    onChange={(e) => setContent(e)} />
                    <br />
                    <br />
                <InputForm label="Duration" name="duration" 
                    type="number" 
                    placeholder="Duration"                     
                    value={lesson.duration}
                    onChange={(e) => setData({ ...lesson, duration: e.target.value })}
                    />
                <InputToogle label="Published" name="is_published" 
                    value={lesson.is_published}
                    onChange={(e) => setData({ ...lesson, is_published: e.target.checked })}                    
                />
                <div className="flex justify-end mt-2">
                    <Button className="btn-dark me-2" type="button" onClick={() => window.history.back()}>Back</Button>
                    {isPending ? <LoadingButton /> : <Button className="btn-default" type="submit">Submit</Button>}                    
                </div>
            </form>
        </div>
    );
};
export default EditLessonForm