"use client";

import { create } from "@/actions/role/RoleAction";
import AdminLayout from "@/app/layouts/admin";
import Button from "@/components/Elements/button";
import InputForm from "@/components/Elements/input/Index";
import LoadingButton from "@/components/Elements/loading/LoadingButton";
import { returnMessageState } from "@/Jotai/atom";
import { useAtom } from "jotai";
import { useActionState, useEffect, useRef, useState } from "react";

const AddRole = () => {
  const [, setReturnMessage] = useAtom(returnMessageState);
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [state, actionForm, isPending] = useActionState(create, null);
  const formRef = useRef<HTMLFormElement>(null);

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
        name: "",
        description: "",
      });
    }
  }, [state, setReturnMessage]);

  return (
    <AdminLayout>
      <h1>Add Role</h1>
      <div className="bg-white p-4 max-w-[45rem]">
        <form action={actionForm} ref={formRef}>
          <InputForm
            label="Name"
            name="name"
            type="text"
            placeholder="Name"
            value={data.name}
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
            <Button type="button" onClick={() => window.history.back()} className="btn-dark mr-2">Back</Button>
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
export default AddRole;
