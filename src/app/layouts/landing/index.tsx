import Drawer from "@/components/Fragments/drawer";
import Footer from "@/components/Fragments/footer";
import Header from "@/components/Fragments/header/header";
import ScroolTopButton from "@/components/Fragments/scroolTopButton";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen relative flex flex-col">
      <Header />
      <div className="p-0 flex-1">{children}</div>
      <Footer />
      <ScroolTopButton />
      <Drawer />
    </div>
  );
};

export default Layout;
