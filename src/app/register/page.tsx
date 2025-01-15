"use client";

import Button from "@/components/Elements/button";
import LoadingButton from "@/components/Elements/loading/LoadingButton";
import Link from "next/link";
import Layout from "../layouts/landing";
import InputForm from "@/components/Elements/input/Index";
import { useActionState, useEffect, useState } from "react";
import { create } from "@/actions/RegisterAction";
import { returnMessageState } from "@/Jotai/atom";
import { useAtom } from "jotai";

const Register = () => {
  const [state, actionForm, loading] = useActionState(create, null);
  const [, setReturnMessage] = useAtom(returnMessageState);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    <Layout>
      <div className="w-full flex justify-center p-6">
        <form action={actionForm} className="flex flex-col p-16 border-2">
          <InputForm
            label="Name"
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <InputForm
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <InputForm
            label="Password"
            name="password"
            type="password"
            value={form.password}
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <div className="flex justify-end">
            {loading ? (
              <LoadingButton />
            ) : (
              <Button className="btn-default" type="submit">
                Register
              </Button>
            )}
          </div>
          <p className="mt-4">
            You already have an account yet?
            <Link href="/login" className="text-blue-500 m-2">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
