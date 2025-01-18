// import Button from "@/components/Elements/button";
import About from "@/components/Fragments/about/about";
import AuthForm from "@/components/Fragments/form/AuthForm";
import TabCourse from "@/components/Fragments/TabCourse/Index";
import Testimoni from "@/components/Fragments/testimoni/testimoni";
import ToastElement from "@/components/Fragments/toast";
// import Image from "next/image";


const LandingPage = () => {
  
  return (
    <>
      <section className="flex flex-row py-5">
        <div className="w-full p-6">
          <h1 className="text-2xl font-semibold">All the skills you need in one place</h1>
          <p>
            Crate custom courses with the EduForge LMS plugin and powerful
            membership sites with the MemberDash.
          </p>
          
          <TabCourse />
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
