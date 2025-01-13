"use client";

import Button from "@/app/components/Elements/button";
import InputForm from "@/app/components/Elements/input/Index";
import LoadingButton from "@/app/components/Elements/loading/LoadingButton";
import SelectForm from "@/app/components/Elements/SelectField/Index";
import Layout from "@/app/layouts/landing";
import { useParams } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { edit } from "@/app/actions/course/CourseAction";
import { returnMessageState } from "@/app/Jotai/atom";
import { useAtom } from "jotai";
import ToastElement from "@/app/components/Fragments/toast";

interface Props {
  title: string;
  description: string;
  status: string;
  price: string;
  duration: string;
}

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const [state, actionForm, isPending] = useActionState(edit, null);
  const [, setReturnMessage] = useAtom(returnMessageState);
  const [course, setCourse] = useState<Props>({
    title: "",
    description: "",
    status: "",
    price: "",
    duration: "",
  });

  useEffect(() => {
    if (!id) 
      return;
    
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data[0] || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, [id]);

  useEffect(() => {
    
    if (state?.status === "error" || state?.status === "success") {
      // console.log(state?.status);
      // console.log(state?.message);
      setReturnMessage({
        message: String(state?.message) || "",
        visible: true,
        type: state?.status || undefined,
      });
    }
    
  }, [state, setReturnMessage]);

  return (
    <Layout>
      <form className=" px-8 py-2 pb-2 mb-4" action={actionForm}>
        <h3>Edit Course</h3>
        <input 
          type="hidden" 
          name="id" 
          value={id} 
        />
        <InputForm
          label="Title"
          name="title"
          type="text"
          placeholder="Title"
          required
          value={course?.title || ""}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />
        <InputForm
          label="Description"
          name="description"
          type="text"
          placeholder="Description"
          value={course?.description || ""}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
        <SelectForm
          label="Status"
          name="status"
          value={course?.status || ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCourse({ ...course, status: e.target.value })
          }
          placeholder="Status"
          options={[
            { id: "draft", text: "Draft" },
            { id: "publish", text: "Publish" },
          ]}
          required
        />
        <InputForm
          label="Price"
          name="price"
          type="number"
          placeholder="Price"
          value={course?.price || ""}
          onChange={(e) => setCourse({ ...course, price: e.target.value })}
        />
        <InputForm
          label="Duration"
          name="duration"
          type="number"
          placeholder="Duration"
          value={course?.duration || ""}
          onChange={(e) => setCourse({ ...course, duration: e.target.value })}
        />
        <div className="flex justify-end">
          {isPending ? (
            <LoadingButton />
          ) : (
            <Button type="submit">Submit</Button>
          )}
          <Button type="button" onClick={() => window.location.href = "/courses"}>Back</Button>
        </div>
      </form>

      <ToastElement />
    </Layout>
  );
};

export default EditCourse;
