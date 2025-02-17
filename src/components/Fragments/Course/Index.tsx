"use client";

import ShimmerLoading from "@/components/Elements/loading/ShimmerLoading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Course = {
  id: string;
  title: string;
  description: string;
  status: string;
  price: string;
  duration: string;
  category: {
    name: string;
  };
};

type orderitem = {
  course_id: string;
  course: Course;
};

interface order {
  id: string;
  orderitem: orderitem[];
}

const CourseView = () => {
  const [data, setData] = useState<order[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const loadData = useCallback(async () => {
    if (session?.id) {
      setLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/myclass/${session?.id}` as string
      )
        .then((res) => res.json())
        .then((data: order[]) => {
          console.log(data);
          // console.log(data[0].orderitem);
          setData(data || []);
          setLoading(false);
        })
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [session?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div
      className={`mt-6 bg-white p-4 rounded-md ${
        loading ? "" : "flex"
      } gap-4 flex-wrap`}
    >
      {loading && <ShimmerLoading />}
      {!loading && data.length === 0 && (
        <div className="w-full flex justify-center">
          <p>No data found</p>
        </div>
      )}
      {!loading &&
        data.length > 0 &&
        data.map(
          (item) =>
            item.orderitem.length > 0 &&
            item.orderitem.map((item) => (
              <div
                key={item.course_id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
              >
                <Image
                  src="/image-1.jpg"
                  alt="asd"
                  className="object-cover rounded-t-lg w-full"
                  width={300}
                  height={150}
                />
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.course.title}
                    </h5>
                  </a>
                  <div className="flex-grow">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {item.course.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-col">
                      <p>Duration: {item.course.duration}</p>
                      <p>Price: {item.course.price}</p>
                      <p>Category : {item.course.category.name}</p>
                    </div>
                    <div className="flex justify-end gap-3 mt-2">
                      <Link
                        className="btn-default mx-2"
                        href={`courses/${item.course.id}/learn`}
                      >
                        Learn
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
    </div>
  );
};
export default CourseView;
