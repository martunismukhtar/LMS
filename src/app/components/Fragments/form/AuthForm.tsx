'use client';

import { jenisFormState } from "@/app/Jotai/atom";
import { useAtom } from "jotai";
import Modal from "../../Elements/modal";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

const AuthForm = () => {
    const [jenisForm,] = useAtom(jenisFormState);
    return (
        <>
         {jenisForm==="login" && <Modal title="Login"><LoginForm/></Modal>}
         {jenisForm==="register" && <Modal title="Register" size="base"><RegisterForm/></Modal>}
        </>
    );
}
export default AuthForm