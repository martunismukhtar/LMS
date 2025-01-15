import Button from "@/components/Elements/button";
import About from "@/components/Fragments/about/about";
import AuthForm from "@/components/Fragments/form/AuthForm";
import Testimoni from "@/components/Fragments/testimoni/testimoni";
import ToastElement from "@/components/Fragments/toast";
import Image from "next/image";


const LandingPage = () => {
  
  return (
    <>
      <section className="flex flex-col sm:flex-row py-[4%] px-[2%] sm:px-[8%]">
        <div className="w-full sm:w-1/2 p-6">
          <h1>Professional tools for content creators.</h1>
          <p>
            Crate custom courses with the EduForge LMS plugin and powerful
            membership sites with the MemberDash.
          </p>
          <Button className="bg-[#235af3] mt-8 py-[16px] px-[30px] text-white rounded-full shadow-lg">
            EduForge LMS
          </Button>
        </div>
        <div className="w-full sm:w-1/2">
          <Image
            src="/Group-2237.svg"
            alt=""
            className="w-full h-full object-contain p-10"
            width={500}
            height={500}
          />
        </div>
      </section>
      {/* Testimoni */}
      <Testimoni />
      {/* about */}
      <About />
      <AuthForm />
      <ToastElement />
    </>
  );
};

export default LandingPage;
