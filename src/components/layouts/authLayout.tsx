import Header from "../common/Header";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";

const AuthLayouts = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayouts;
