import Footer from "@/components/Fragments/footer";
import Header from "@/components/Fragments/header/header";

const LearnLayout = ({ children }: { children: React.ReactNode }) => {
    return (
    <div className="w-full h-screen relative flex flex-col">
      <Header />
      <div className="p-0 flex-1">{children}</div>
      <Footer />
    </div>
    )
};

export default LearnLayout;