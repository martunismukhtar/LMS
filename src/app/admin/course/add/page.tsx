"use client";

import { create } from "@/actions/course/CourseAction";
import AdminLayout from "@/app/layouts/admin";
import Button from "@/components/Elements/button";
import InputForm from "@/components/Elements/input/Index";
import LoadingButton from "@/components/Elements/loading/LoadingButton";
import SelectForm from "@/components/Elements/SelectField/Index";
import { returnMessageState } from "@/Jotai/atom";
import { useAtom } from "jotai";
import { useActionState, useEffect, useState } from "react";

const AddCourse = () => {
  const [, setReturnMessage] = useAtom(returnMessageState);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    status: "",
    price: "",
    duration: "",
    category_id: "",
  });
  const [state, actionForm, isPending] = useActionState(create, null);  

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories` as string)
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);

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
        title: "",
        description: "",
        status: "",
        price: "",
        duration: "",
        category_id: ""
      });
    }
  }, [state, setReturnMessage]);

  const category_data = category.map((item: Record<string, string>) => {
    return {
      id: item.id,
      text: item.name
    }
  })
  return (
    <AdminLayout>
      <h1>Add Course</h1>      
      <div className="bg-white p-4 max-w-[45rem]">
        <form action={actionForm}>
          <SelectForm
            label="Category"
            placeholder="-- Choose --"
            name="category_id"
            value={data.category_id}
            onChange={(e) => setData({ ...data, category_id: e.target.value })}
            required
            options={category_data}
          />
          <InputForm
            label="Title"
            name="title"
            type="text"
            placeholder="Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            required
          />
          <InputForm
            label="Description"
            name="description"
            type="text"
            placeholder="Description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            required
          />
          <InputForm
            label="Price"
            name="price"
            type="number"
            placeholder="Price"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
            required
          />
          <InputForm
            label="Duration"
            name="duration"
            type="text"
            placeholder="Duration"
            value={data.duration}
            onChange={(e) => setData({ ...data, duration: e.target.value })}
            required
          />
          <SelectForm
            label="Status"
            placeholder="-- Status --"
            name="status"
            value={data.status}
            onChange={(e) => setData({ ...data, status: e.target.value })}
            required
            options={[
              { id: "draft", text: "Draft" },
              { id: "publish", text: "Publish" },
            ]}
          />
          <div className="flex justify-end">
            {isPending ? (
              <LoadingButton />
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
export default AddCourse;