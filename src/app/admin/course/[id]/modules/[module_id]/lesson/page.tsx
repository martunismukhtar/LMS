"use client";

import AdminLayout from "@/app/layouts/admin";
import LessonForm from "@/components/Fragments/LessonForm/Index";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const LessonPage = () => {
  const { id, module_id } = useParams();
  const [course, setCourse] = useState<string | null>(null);
  const [moduleName, setModuleName] = useState<string | null>(null);
    
  const fetchData = useCallback(async () => {
    try {
      const [course_name, module_name] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${id}/name`
        ).then((res) => res.json()),
        fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/modules/${module_id}/name`
        ).then((res) => res.json()),
      ]);
      setCourse(course_name.message);
      setModuleName(module_name.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id, module_id]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, fetchData]);

  return (
    <AdminLayout>
      <div className="bg-white rounded p-4">
        <h1>Course: {course}</h1>
        <h1>Module: {moduleName}</h1>
        <div className="mt-4 pt-4 border-t">
            <LessonForm module_id={String(module_id)} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default LessonPage;
