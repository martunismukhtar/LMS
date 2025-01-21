"use client";

import { useEffect, useState } from "react";
import Layout from "../layouts/landing";
import Table from "@/components/Elements/table";
import Swal from "@/components/Elements/Swal";
// import CourseView from "./view";


type Course = {
  id: string;
  title: string;
  description: string;
  status: string;
  price: string;
  duration: string;
};

const Courses = () => {
  const [courses, setData] = useState<Course[]>([]);
  const [header] = useState<string[]>([
    "id",
    "title",
    "description",
    "status",
    "price",
    "duration",
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("api/courses")
      .then((res) => res.json())
      .then((data:Course[]) => setData(data || []))
      .catch((err) => console.error("Error fetching products:", err));
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
        .then(() => {
          btnDel.innerHTML = "Delete";
          setData((prevData) =>
            prevData.filter((item) => item.id !== selectedId)
          );
        })
        .catch((error) => {
          console.error(error);
          btnDel.innerHTML = "Delete";
        });
    }
  };

  const handleDetails = (id: string) => {
    console.log("Show details of course with ID:", id);
    // Tampilkan detail kursus
  };

  const buttonConfig = [
    {
      label: "Edit",
      href: "/courses",
      onClick: () => {},
      className: "bg-yellow-500 text-white hover:text-white",
    },
    {
      label: "Delete",
      onClick: (id: string) => handleDelete(id),
      className: "bg-red-500 text-white hover:text-white",
    },
    {
      label: "Details",
      onClick: (id: string) => handleDetails(id),
      className: "bg-green-500 text-white hover:text-white",
    },
  ];

  return (
    <Layout>      
      <Table header={header} data={courses} buttonConfig={buttonConfig} />
      <Swal
        visible={show}
        onConfirm={handleConfirm}
        onCancel={() => setShow(false)}
      />
    </Layout>
  );
};
export default Courses;
