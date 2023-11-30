import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <>
      <Navbar />
      <main className="bg-base-200">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
