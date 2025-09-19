import Header from "../common/Header";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";

const CommonLayouts = () => {
  return (
    <div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CommonLayouts;
