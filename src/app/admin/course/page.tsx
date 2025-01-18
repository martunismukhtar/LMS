"use client";

import AdminLayout from "@/app/layouts/admin";
import Button from "@/components/Elements/button";
import ShimmerLoading from "@/components/Elements/loading/ShimmerLoading";
import Swal from "@/components/Elements/Swal";
import { returnMessageState } from "@/Jotai/atom";
import { useAtom } from "jotai";
// import Table from "@/components/Elements/table";
import Link from "next/link";
import { useEffect, useState } from "react";

type Course = {
  id: string;
  title: string;
  description: string;
  status: string;
  price: string;
  duration: string;
  category:{    
    name: string;
  }
};

const CoursePage = () => {
  const [data, setData] = useState<Course[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setReturnMessage] = useAtom(returnMessageState);

  const loadData = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses` as string)
      .then((res) => res.json())
      .then((data: Course[]) => {
        setData(data || []);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setShow(true);
  };

  const handleConfirm = () => {
    if (selectedId) {
      setShow(false);
      const btnDel = document.querySelector(
        `.btn-del-${selectedId}`
      ) as HTMLButtonElement;
      btnDel.innerHTML = "Deleting...";

      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${selectedId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          btnDel.innerHTML = "Delete";
          setData((prevData) =>
            prevData.filter((item) => String(item.id) !== String(selectedId))
          );
        })
        .catch((error) => {
          console.error(error);
          btnDel.innerHTML = "Delete";
        });
    }
  };

  const handlePublish=(id: string, status: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${id}/publish`, {
      method: "POST",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {        
        if(data.status === "success"){
          setReturnMessage({
            message: String(data?.message) || "",
            visible: true,
            type: data?.status || undefined,
          });
          loadData();
        }
    })
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Course</h1>        
      </div>
      <div className="flex justify-end">
        <Link
          href="/admin/course/add"
          className="btn-default"
        >
          Add Course
        </Link>
      </div>
      <div className={`mt-6 bg-white p-4 rounded-md ${loading ? "" : "flex"} gap-4 flex-wrap`}>
        {loading && <ShimmerLoading />}
        {!loading && data.length === 0 && <div className="w-full flex justify-center"><p>No data found</p></div>}
        {!loading && data.length > 0 &&
          data.map((item) => (
            <div
              key={item.id}
              className="max-w-sm px-6 py-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
            >
              <div className="flex justify-end">
                <span onClick={() => handleDelete(item.id)} className="cursor-pointer btn-del-{item.id} text-2xl font-medium text-red-400">
                  x
                </span>
              </div>              
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
              </a>
              <div className="flex-grow">
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>                
              </div>
              <div>
                <div className="flex flex-col">
                  <p>Duration: {item.duration}</p>
                  <p>Price: {item.price}</p>
                  <p>Category : {item.category.name}</p>
                </div>                
                <div className="inline-block justify-start gap-3 mt-2">
                  <Link
                    href={`/admin/course/${item.id}`}
                    className="btn-yellow me-2"
                  >
                    Edit
                  </Link>

                  <Button
                    className={`${item.status === "publish" ? "btn-red" : "btn-green"} mx-2`}
                    onClick={() => handlePublish(item.id, item.status)}
                  >
                    {item.status === "publish" ? "Unpublish" : "Publish"}                    
                  </Button>
                  <Link
                    className="btn-default mx-2"
                    href={`/admin/course/${item.id}/modules`}
                  >
                    + Add Modules
                  </Link>
                </div>
              </div>
            </div>
          ))
        }

        <Swal
          visible={show}
          onConfirm={handleConfirm}
          onCancel={() => setShow(false)}
        />
      </div>
    </AdminLayout>
  );
};
export default CoursePage;
