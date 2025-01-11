'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

const SlideNav = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      id: 1,
      text: "“As someone who looked around for months before deciding to go with EduForge, I can say with confidence – if you’re trying to make a course to sell your expertise, EduForge provides the structure, and so much more.”",
    },
    {
      id: 2,
      text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit.”",
    },
    {
      id: 3,
      text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.”",
    },
    {
      id: 4,
      text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.”",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full lg:w-1/2 relative p-48">
      <div className="bg-[#235af3] w-7/12 h-full rounded-r-xl rounded-l-full absolute top-0 right-0 overflow-hidden"></div>
      <div className="bg-transparent w-full sm:w-9/12 h-full absolute top-0 left-0 overflow-hidden flex flex-col items-center justify-between">
        <div className="relative w-full overflow-hidden mt-8">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0 px-4">
                <div className="h-auto flex items-center justify-center bg-gray-200 rounded-xl p-6 shadow-lg">
                  <div className="text-center max-w-lg">
                    <p className="mb-4 text-gray-700">{slide.text}</p>
                    <div className="flex items-center justify-center gap-4">
                      <Image
                        src="/Group-2365.svg"
                        alt="User avatar"
                        className="w-12 h-12"
                        width={150}
                        height={150}
                      />

                      <p>
                        <strong>Adam Barragato</strong>
                        <br />
                        Trustpilot review
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>          
        </div>
        <div className="flex mt-4 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-5 h-5 rounded-full ${
                  index === currentIndex ? "bg-[#235af3]" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
      </div>
    </div>
  );
};
export default SlideNav;
