"use client";

import { signIn } from "next-auth/react";
import Layout from "../layouts/landing";
import Button from "../components/Elements/button";
import InputForm from "../components/Elements/input/Index";

const Login = () => {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if(res?.status==200) {
        window.location.href = "/";
    }
    
  };

  return (
    <Layout>
      <div className="w-full flex justify-center">
        <form onSubmit={handleLogin} className="flex flex-col p-32 border-2">
          <InputForm
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <InputForm
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <Button type="submit">Login</Button>
          <Button type="button" onClick={() => console.log("register")}>Register</Button>
        </form>
      </div>
    </Layout>
  );
};
export default Login;
