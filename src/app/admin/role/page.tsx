"use client";

import AdminLayout from "@/app/layouts/admin";
import ShimmerLoading from "@/components/Elements/loading/ShimmerLoading";
import Swal from "@/components/Elements/Swal";
import Table from "@/components/Elements/table";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Role {
  id: string;
  name: string;
  description: string;
}

const RolePage = () => {  
  const [data, setData] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [header] = useState<string[]>(["id", "name", "description"]);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/role` as string)
      .then((res) => res.json())
      .then((data: Role[]) => {
        setData(data || []);
        setIsLoading(false);
      })
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/role/${selectedId}`,
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

  const buttonConfig = [
    {
      label: "Edit",
      href: "/admin/role",
      onClick: () => {},
      className: "btn-yellow",
    },
    {
      label: "Delete",
      onClick: (id: string) => handleDelete(id),
      className: "btn-red",
    },
  ];

  const tableData = data.map((category) => ({
    id: category.id.toString(),
    name: category.name,
    description: category.description,
  }));
  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Role</h1>
      </div>
      <div className="flex justify-end">
        <Link
          href="/admin/role/add"
          className="bg-primary py-[16px] px-[30px] text-white rounded-2xl shadow-lg"
        >
          Add Role
        </Link>
      </div>
      <div className="mt-6 bg-white p-4 rounded-md">
      {!isLoading ? <Table header={header} data={tableData} buttonConfig={buttonConfig} /> : <ShimmerLoading />} 
        <Swal
          visible={show}
          onConfirm={handleConfirm}
          onCancel={() => setShow(false)}
        />
      </div>
    </AdminLayout>
  );
};
export default RolePage;
