"use client";

import { edit } from "@/actions/category/CategoryAction";
import AdminLayout from "@/app/layouts/admin";
import Button from "@/components/Elements/button";
import InputForm from "@/components/Elements/input/Index";
import LoadingButton from "@/components/Elements/loading/LoadingButton";
import { returnMessageState } from "@/Jotai/atom";
import { useAtom } from "jotai";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

interface Category {
  name: string;
  description: string;
}

const EditCategory = () => {
  const [data, setData] = useState<Category>({
    name: "",
    description: "",
  });
  const [state, actionForm, isPending] = useActionState(edit, null);
  const [, setReturnMessage] = useAtom(returnMessageState);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data[0] || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, [id]);

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
    <AdminLayout>
      <h1>Edit Category</h1>
      <div className="bg-white p-4 max-w-[45rem]">
        <form action={actionForm}>
          <input type="hidden" name="id" value={id} />
          <InputForm
            label="Name"
            name="name"
            type="text"
            placeholder="Name"
            value={data?.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
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
          <div className="flex justify-end">
            <Link
              href="/admin/category"
              className="btn-dark mr-2"
            >
              Back
            </Link>
            {isPending ? (
              <LoadingButton />
            ) : (
              <Button className="btn-default" type="submit">Submit</Button>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditCategory;
