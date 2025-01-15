'use server'
import { z } from "zod";

export async function create(state: unknown, formData: FormData) {
  const schema = z.object({    
    title: z.string({message: "Title is required"}).min(3, { message: "Title must be at least 3 characters" }),
    course_id: z.number({message: "Course ID is required"}),
  });
  const parsed = schema.safeParse({    
    title: formData.get("title"),
    course_id: Number(formData.get("course_id")),
  });
  
  if (!parsed.success) {  
    return {
      message: String(parsed.error.errors[0].message),
      status: "error",
    };
  }  
  
  try {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/modules/` as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.get("title"),
            course_id: formData.get("course_id")
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
        message: "Module created successfully",
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