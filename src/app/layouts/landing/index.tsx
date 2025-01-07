import Drawer from "@/app/components/Fragments/drawer";
import Footer from "@/app/components/Fragments/footer";
import Header from "@/app/components/Fragments/header/header";
import ScroolTopButton from "@/app/components/Fragments/scroolTopButton";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full relative">
      <Header />
      <div className="p-0">{children}</div>
      <Footer />
      <ScroolTopButton />
      <Drawer />
    </div>
  );
};

export default Layout;
