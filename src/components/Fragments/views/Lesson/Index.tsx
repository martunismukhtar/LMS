"use client";

import { useEffect, useState } from "react";

interface Props {
  lesson_id: string;
}

const HtmlRenderer = ({ htmlContent }: { htmlContent: string }) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  };

const ViewLesson = (props: Props) => {
  
  const [lesson, setData] = useState({
    module_id: "",
    title: "",
    description: "",
    content: "",
    video_url: "",
    duration: "",
    is_published: false,
  });

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lesson/${props.lesson_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData({
          module_id: data[0].module_id,
          title: data[0].title,
          description: data[0].description,
          content: data[0].content,
          video_url: data[0].video_url,
          duration: data[0].duration,
          is_published: data[0].is_published ? true : false,
        });
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [props.lesson_id]);

  return (
    <div className="p-2">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
          {lesson.title}
        </h1>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400 mb-5">
          {lesson.description}
        </p>
     
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden p-3 mb-5">
        <iframe
            className="absolute top-0 left-0 w-full h-full rounded"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
        <HtmlRenderer htmlContent={lesson.content} />
            
      <div>
        duration : {lesson.duration}
      </div>
      
      <div>
        {lesson.is_published ? "Published" : "Not Published"}
      </div>
      
    </div>
  );
};
export default ViewLesson;
