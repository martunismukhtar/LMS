"use server";
import { z } from "zod";
// import axios from 'axios';

export async function create(state: unknown, formData: FormData) {
  const schema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    status: z.string(),
    price: z.number(),
    duration: z.number(),
  });
  const parsed = schema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    price: formData.get("price"),
    duration: formData.get("duration"),
  });

  if (!parsed.success) {
    return {
      message: parsed.error.errors[0].message,
      status: "error",
    };
  }
  const data = parsed.data;
  console.log(data);
  return data;
  // const res = await fetch(`/api/courses/${data.id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  // }, {
  //     data
  // }).then(res=>res.data)
  // .catch(err=>{
  //     return err.message
  // })
  const res = await fetch(`/api/courses/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(res);
  if (res.status !== 200) {
    return {
      message: res,
      status: "error",
    };
  }
  // console.log(res)
  return res;
}

export async function edit(state: unknown, formData: FormData) {  
  const schema = z.object({
    id: z.string(),
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",      
    }).min(3, { message: "Title must be at least 3 characters" }),
    description: z.string(),
    status: z.string(),
    price: z.string(),
    duration: z.number().int({ message: "Duration must be a number" })
      .min(1, { message: "Duration must be at least 1" }),
  });
  const validatedData = schema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    price: formData.get("price"),
    duration: Number(formData.get("duration")),
  });
  if (!validatedData.success) {
    console.log(validatedData.error.errors[0].message);
    return {
      message: String(validatedData.error.errors[0].message),
      status: "error",
    };
  }  

  try {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${formData.get("id")}` as string,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.get("title"),
            description: formData.get("description"),
            status: formData.get("status"),
            price: formData.get("price"),
            duration: formData.get("duration"),
          }),
        }
      );
    
      if (res.status !== 200) {
        return {
          message: res,
          status: "error",
        };
      }
      return {
        message: "Course updated successfully",
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
