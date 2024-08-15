import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./../Pages/Shared/NavBar/NavBar";
import Footer from "./../Pages/Shared/Footer/Footer";

const Root = () => {
  return (
    <div>
      <div className="h-20">
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Root;
