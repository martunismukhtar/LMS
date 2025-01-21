'use server'
import {z} from 'zod'

export async function create(state:unknown, formData: FormData) {
    const schema = z.object({
        email: z.string().min(8).email(),
        name: z.string().min(3),        
        password: z.string().min(5)
    });

    const parsed = schema.safeParse({
        email: formData.get('email'),
        name: formData.get('name'),        
        password: formData.get('password')
    });

    if(!parsed.success) {        
        return {
            message: parsed.error.errors[0].message,
            status:'error'
        }
    }    
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup/` as string,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formData.get("email"),
                name: formData.get("name"),
                status: formData.get("status"),
                price: formData.get("price"),
                duration: formData.get("duration"),
                password: formData.get("password")
              }),
            }
          ).catch((error) => {
              return error.message
          });             
          if(res.status === 409) {
            return {
              message: "Email already exists",
              status: "error",
            };
          } else
          if (res.status !== 200) {        
            return {
              message: res.statusText,
              status: "error",
            };
          }
          return {
            message: "Registered successfully",
            status: "success",
          };
      }
      catch (error) {        
          return {
              message: error,
              status: "error",
          };
      }
}