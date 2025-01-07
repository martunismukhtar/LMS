import SlideNav from "./SlideNav";

const Testimoni = () => {
  return (
    <section
      id="testimoni"
      className="bg-[#ebeee4] py-[4%] px-[2%] sm:px-[8%] flex flex-col sm:flex-row"
    >
      <div className="w-full sm:w-1/2">
        <h4 className="font-semibold">TESTIMONIALS</h4>
        <h1 className="font-medium p-3">What People Say About Us</h1>
        <p>See what real customuers are saying about EduForge</p>
      </div>
      <SlideNav />
    </section>
  );
};
export default Testimoni;
