'use server'
import { z } from "zod";

export async function create(state: unknown, formData: FormData) {
  const schema = z.object({    
    title: z.string({message: "Title is required"}).min(3, { message: "Title must be at least 3 characters" }),
    description: z.string().optional(),
    video_url:z.string().optional(),
    content: z.string().optional(),
    duration: z.string().optional(),
    is_published: z.boolean(),    
    module_id: z.string({message: "Module ID is required"}),
  });
  const parsed = schema.safeParse({    
    title: formData.get("title"),
    description: formData.get("description"),
    video_url: formData.get("video_url"),
    content: formData.get("content"),
    duration: formData.get("duration"),
    is_published: Boolean(formData.get("is_published")),
    module_id: formData.get("module_id"),
  });  

  if (!parsed.success) {  
    return {
      message: String(parsed.error.errors[0].message),
      status: "error",
    };
  }  
  
  try {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lesson/` as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.get("title"),
            description: formData.get("description"),
            video_url: formData.get("video_url"),
            content: formData.get("content"),
            duration: formData.get("duration"),
            is_published: formData.get("is_published") ? true : false,
            module_id: formData.get("module_id")
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
        message: "Lesson created successfully",
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
    description: z.string().optional(),
    video_url:z.string().optional(),
    content: z.string().optional(),
    duration: z.string().optional(),
    is_published: z.boolean(),    
    module_id: z.string({message: "Module ID is required"}),
  });
  const validatedData = schema.safeParse({    
    title: formData.get("title"),
    description: formData.get("description"),
    video_url: formData.get("video_url"),
    content: formData.get("content"),
    duration: formData.get("duration"),
    is_published: Boolean(formData.get("is_published")),
    module_id: formData.get("module_id"),
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lesson/${formData.get("id")}` as string,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.get("title"),
            description: formData.get("description"),
            video_url: formData.get("video_url"),
            content: formData.get("content"),
            duration: formData.get("duration"),
            is_published: formData.get("is_published") ? true : false,
            module_id: formData.get("module_id")
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
        message: "Lesson updated successfully",
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