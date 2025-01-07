
'use client'

import { useActionState, useEffect } from "react";
import InputForm from "../Elements/input/Index";
import { create } from '@/app/actions/RegisterAction';
import LoadingButton from "../Elements/loading/LoadingButton";
import Button from "../Elements/button";
import { returnMessageState } from "@/app/Jotai/atom";
import { useAtom } from "jotai";
// import { signIn } from "next-auth/react";

const RegisterForm = () => {
    const [, setReturnMessage] = useAtom(returnMessageState);
    const [state, actionForm, isPending] = useActionState(create, null);

    useEffect(() => {                
        if(state?.status==='error' || state?.status==='success') {
            setReturnMessage({
                message: state?.message || '',
                visible: true,
                type: state?.status || undefined
            })
        }
        // if(state?.status==='success') {
        //     // return signIn(undefined, { callbackUrl: "/" })
        // }
    }, [state?.status])

    return (
        <>
        <form className=" px-8 py-2 pb-2 mb-4" action={actionForm}>
            <h3>Register Form</h3>
            <InputForm label="Email" name="email" type="email" placeholder="Email" />
            <InputForm label="Name" name="name" type="text" placeholder="Name" />
            <InputForm label="Username" name="username" type="text" placeholder="Username" />
            <InputForm label="Password" name="password" type="password" 
                placeholder="Password" />
            <div className="flex justify-end">
                {isPending ? <LoadingButton /> : <Button type="submit">Submit</Button>}
            </div>                
        </form>
        <hr></hr>
        <div className="px-8 py-2 pb-2 mb-4">
            <h3>Or Register dengan akun gmail anda</h3>
            {state?.status==='error' && <p className="text-red-500">{state.message}</p>}
        </div>
        
        </>
    );
};

export default RegisterForm;