"use server";
import { z } from "zod";
// import axios from 'axios';

export async function create(state: unknown, formData: FormData) {
  const schema = z.object({    
    name: z.string(),
    description: z.string(),
  });
  const parsed = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description")
  });

  if (!parsed.success) {    
    return {
      message: String(parsed.error.errors[0].message),
      status: "error",
    };
  }  
  try {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/role/` as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            description: formData.get("description")
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
        message: "Role added successfully",
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
    id: z.string(),
    name: z.string(),
    description: z.string()
  });
  const validatedData = schema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description")
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/role/${formData.get("id")}` as string,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            description: formData.get("description")
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
        message: "Role updated successfully",
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
