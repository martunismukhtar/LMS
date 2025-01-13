import Image from "next/image";
import Button from "../../Elements/button";

const About = () => {
  return (
    <section className="bg-[#faf9f6] py-[4%] px-[2%] sm:px-[8%] flex flex-col sm:flex-row gap-6">
      <div className="w-full sm:w-1/2 text-center p-2">
        <h2>NEW: EduForge Reports and ProPanel 3.0</h2>
        <p>
          At EduForge, we’re always striving to enhance your experience and
          deliver tools that make managing your online courses smoother and more
          insightful. That’s why we’re thrilled to announce new EduForge
          reporting features—both in EduForge LMS and in ProPanel, our advanced
          reporting add-on.
        </p>
        <Button className="bg-[#235af3] mt-8 py-[16px] px-[30px] text-white rounded-full shadow-lg">
          Read More
        </Button>
      </div>
      <div className="w-full sm:w-1/2">
        <Image          
          width={16}
          height={9}
          src="/v2_09162024.png"
          className="object-cover"
          alt=""
        />
      </div>
    </section>
  );
};
export default About;
