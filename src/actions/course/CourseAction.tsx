"use server";
import { z } from "zod";

export async function create(state: unknown, formData: FormData) {
  const schema = z.object({    
    title: z.string({message: "Title is required"}).min(3, { message: "Title must be at least 3 characters" }),
    description: z.string({message: "Description is required"}).min(3, { message: "Description must be at least 3 characters" }),
    status: z.string({message: "Status is required"}).min(3, { message: "Status must be at least 3 characters" }),
    price: z.number(),
    duration: z.number(),
    category_id: z.number(),
  });
  const parsed = schema.safeParse({    
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    price: Number(formData.get("price")),
    duration: Number(formData.get("duration")),
    category_id: Number(formData.get("category_id")),
  });
  
  if (!parsed.success) {  
    return {
      message: String(parsed.error.errors[0].message),
      status: "error",
    };
  }  
  
  try {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/` as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.get("title"),
            description: formData.get("description"),
            status: formData.get("status"),
            price: formData.get("price"),
            duration: formData.get("duration"),
            category_id: formData.get("category_id")
          }),
        }
      );
      console.log(res.status);
      if (res.status !== 200) {        
        return {
          message: res.statusText,
          status: "error",
        };
      }
      return {
        message: "Category updated successfully",
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

export async function edit(state: unknown, formData: FormData) {  
  const schema = z.object({    
    title: z.string({message: "Title is required"}).min(3, { message: "Title must be at least 3 characters" }),
    description: z.string({message: "Description is required"}).min(3, { message: "Description must be at least 3 characters" }),
    status: z.string({message: "Status is required"}).min(3, { message: "Status must be at least 3 characters" }),
    price: z.number(),
    duration: z.number(),
    category_id: z.number(),
  });
  const validatedData = schema.safeParse({    
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    price: Number(formData.get("price")),
    duration: Number(formData.get("duration")),
    category_id: Number(formData.get("category_id")),
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
            category_id: formData.get("category_id")
          }),
        }
      );
    
      if (res.status !== 200) {
        return {
          message: res.statusText,
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
