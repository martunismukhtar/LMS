'use client';

import Button from "@/components/Elements/button";
import { useCart } from "@/context/CartContext";
// import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface CatCourse {
  id: string;
  name: string;
  courses: {
    id: string;
    title: string;
    price: string;
    description: string;
  }[];
}
interface ActiveData {
  id: string;
  title: string;
  price: string;
  description?: string;
}

const TabCourse = () => {
  const { addToCart } = useCart()
  // const [cart, setCart] = useState<ActiveData[]>([]);
  const {data:session} = useSession()
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeData, setActiveData] = useState<ActiveData[]>([]);
  const [courses, setCourses] = useState<CatCourse[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // const 

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/category` as string
    )
      .then((res) => res.json())
      .then((data: CatCourse[]) => {
        if (data?.length > 0) {          
          setCourses(data);
          setActiveTab(data[0].name);
          setActiveData(data[0].courses);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleActiveTab = (tabName: string) => {
    setActiveTab(tabName);
    const selectedTab = courses.find((item) => item.name === tabName);
    if (selectedTab) {
      setActiveData(selectedTab.courses);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleRedirect = () => {};
  const handleCart = async (course:ActiveData) => {  
    if(!session?.user){
      router.push('/login')      
    }
    addToCart({
      id: '',
      course_id: course.id,
      price: course.price,
      quantity: 1,
      course:{
        title: course.title,
        description: course.description??""
      }
    })
    
  };
  return (
    <div className="text-sm font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      {/* Tab Navigation */}
      <ul className="flex flex-wrap -mb-px">
        {courses.map((tab) => (
          <li key={tab.id} className="me-2">
            <button
              onClick={() => handleActiveTab(tab.name)}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === tab.name
                  ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div data-tab-content="" className="py-5">
        {activeData.length > 0 ? (
          <div
            ref={scrollContainerRef}
            id="tab-content"
            role="tabpanel"
            className="flex space-x-4 overflow-hidden scrollbar-smooth"
          >
            {activeData.map((course) => (
              <div
                onClick={handleRedirect}
                key={course.id}
                className="cursor-pointer min-w-[300px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
              >
                <Image
                  src="/image-1.jpg"
                  alt={course.title}
                  className="object-cover rounded-t-lg w-full"
                  width={300}
                  height={150}
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {course.title}
                  </h1>
                  <p className="text-slate-700 font-light flex-grow mt-3">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-end">
                    <p className="text-lg font-semibold text-blue-600">
                      ${course.price}
                    </p>
                  </div>
                </div>
                <Button className="btn-default mb-2 mx-2" onClick={()=>handleCart(course)}>Add to Cart</Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No courses available for this category.
          </p>
        )}
        {/* Scroll Right Button */}
        {activeData.length > 5 && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-white focus:outline-none"
              aria-label="Scroll Left"
            >
              <svg
                viewBox="0 0 1024 1024"
                width="24px"
                height="24px"
                className="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                    fill="#000000"
                  ></path>
                </g>
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-white focus:outline-none"
              aria-label="Scroll Right"
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 1024 1024"
                className="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                    fill="#000000"
                  ></path>
                </g>
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TabCourse;
