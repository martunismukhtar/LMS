'use server'
import {z} from 'zod'
import axios from 'axios';
// import { revalidatePath } from 'next/cache';

export async function create(state:unknown, formData: FormData) {
    const schema = z.object({
        email: z.string().min(8).email(),
        name: z.string().min(3),
        username: z.string().min(3),
        password: z.string().min(5)
    });

    const parsed = schema.safeParse({
        email: formData.get('email'),
        name: formData.get('name'),
        username: formData.get('username'),
        password: formData.get('password')
    });

    if(!parsed.success) {        
        return {
            message: parsed.error.errors[0].message,
            status:'error'
        }
    }
    const data = parsed.data
    // try {
        // console.log(process.env.VITE_API as string)
        const res = await axios.post(process.env.VITE_API as string, {
            ...data, 
            completed: false
        }).then(res=>res.data)
        .catch(err=>{
            // console.log(err.message)
            return err.message
        })
        if(res.status !== 200) {
            return {
                message:res,
                status:'error'
            }
        }
        
        return res;
    // } catch (error) {
    //     return {
    //         message:'failed to create user',
    //         status:error
    //     }
    // }
    // const res = await fetch(process.env.VITE_API as string, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         ...data,
    //         completed: false
    //     })
    // })
    // if(!res.ok){
    //     return {
    //         message:'failed to create user',
    //         status:'error'
    //     }
    // }
    // revalidatePath('/')
    // return {
    //     message: 'success',
    //     status: 'success'
    // }
}