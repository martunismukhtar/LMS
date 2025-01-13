"use client";

import { signIn } from "next-auth/react";
import Layout from "../layouts/landing";
import Button from "../components/Elements/button";
import InputForm from "../components/Elements/input/Index";
import { useState } from "react";
import Link from "next/link";
import LoadingButton from "../components/Elements/loading/LoadingButton";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if(res?.status==200) {
        setLoading(false);
        window.location.href = "/";
    }    
  };

  return (
    <Layout>
      <div className="w-full flex justify-center p-6">
        <form onSubmit={handleLogin} className="flex flex-col p-16 border-2">
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
            {loading ? <LoadingButton /> : <Button type="submit">Login</Button> }            
          </div>          
          <p className="mt-4">
          You do not have an account yet? 
            <Link href="/register" className="text-blue-500 m-2">Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};
export default Login;
