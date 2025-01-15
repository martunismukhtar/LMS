"use client";

import { create } from "@/actions/course/ModuleAction";
import AdminLayout from "@/app/layouts/admin";
import Button from "@/components/Elements/button";
import InputForm from "@/components/Elements/input/Index";
import LoadingButton from "@/components/Elements/loading/LoadingButton";
import Modal from "@/components/Elements/modal";
// import QuillInput from "@/components/Elements/Editor/Index";
// import InputToogle from "@/components/Elements/toogle/InputToogle";
import { jenisFormState, returnMessageState } from "@/Jotai/atom";
import { useAtom } from "jotai";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState, useCallback } from "react";

interface DataModule {
  id: string;
  title: string;
  lesson: [{
    id:string;
    title:string;
    duration:string;
  }];
}

const ModulesPage = () => {
  const [course, setCourse] = useState<string | null>(null);
  const [jenisForm, setJenisForm] = useAtom(jenisFormState);
  const [data, setData] = useState({
    title: "",
  });

  const [modules, setModules] = useState<DataModule[]>([]);
  const [state, actionForm, isPending] = useActionState(create, null);
  const [, setReturnMessage] = useAtom(returnMessageState);
  const { id } = useParams();

  // State untuk mengelola status accordion
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Handler untuk toggle accordion
  const toggleAccordion = useCallback(
    (index: number) => {
      setActiveAccordion(activeAccordion === index ? null : index);
    },
    [activeAccordion]
  );

  // Fetch course name
  const fetchCourseName = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${id}/name`
      );
      const data = await response.json();
      setCourse(data.message);
    } catch (error) {
      console.error("Error fetching course name:", error);
    }
  }, [id]);

  // Fetch modules
  const fetchModules = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/modules/${id}/course`
      );
      const data = await response.json();
      setModules(data.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  }, [id]);

  // Run fetch calls on mount or when ID changes
  useEffect(() => {
    if (id) {
      fetchCourseName();
      fetchModules();
    }
  }, [id, fetchCourseName, fetchModules]);

  // Handle form action state changes
  useEffect(() => {
    if (state?.status === "error" || state?.status === "success") {
      setReturnMessage({
        message: String(state?.message) || "",
        visible: true,
        type: state?.status || undefined,
      });
    }
    if (state?.status === "success") {
      setData({ title: "" });
      setJenisForm("");
      fetchModules();
    }
  }, [state, setReturnMessage, setJenisForm, fetchModules]);

  return (
    <AdminLayout>
      <div className="bg-white rounded p-4">
        <h1>Course: {course}</h1>
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => setJenisForm("module_form")}
            className="btn-default"
          >
            Add Module
          </Button>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div>
            {/** Accordion Items */}
            {modules.map((item, index) => (
              <div key={index}>
                <h2>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className={`flex items-center justify-between w-full p-5 font-medium text-gray-500 border ${
                      activeAccordion === index
                        ? "border-gray-400 bg-gray-100"
                        : "border-gray-200"
                    } rounded-t-xl focus:ring-4 focus:ring-gray-200`}
                    aria-expanded={activeAccordion === index ? "true" : "false"}
                  >
                    <span>{item.title}</span>
                    <svg
                      className={`w-3 h-3 transition-transform ${
                        activeAccordion === index ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                {activeAccordion === index && (
                  <div className="p-5 border border-gray-200">
                    <div className="flex justify-end">
                      <Link
                        className="btn-default"
                        href={`/admin/course/${id}/modules/${item.id}/lesson`}
                      >
                        Add Lesson
                      </Link>
                    </div>
                    {item.lesson.map((lesson_item, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                         <div className="bg-gray-100 py-2 px-3 my-2 rounded-md flex justify-between">
                            <span>{lesson_item.title}</span>
                            <span>{lesson_item.duration}</span>
                          </div> 
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/course/${id}/modules/${item.id}/lesson/${lesson_item.id}/view`} className="btn-default">Detail</Link>
                            <Link href={`/admin/course/${id}/modules/${item.id}/lesson/${lesson_item.id}`} className="btn-yellow">Edit</Link>
                            <Button className="btn-red">Hapus</Button>
                          </div>
                        
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {jenisForm === "module_form" && (
        <Modal title="Add Module" size="base">
          <form action={actionForm}>
            <input type="hidden" name="course_id" value={id} />
            <InputForm
              label="Module Name"
              name="title"
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Module Name"
              required
            />
            <div className="flex justify-end">
              {isPending ? (
                <LoadingButton />
              ) : (
                <Button type="submit" className="btn-default">
                  Save
                </Button>
              )}
            </div>
          </form>
        </Modal>
      )}
      
    </AdminLayout>
  );
};

export default ModulesPage;
