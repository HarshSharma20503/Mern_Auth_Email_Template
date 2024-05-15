import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import PrivateRoutes from "./Util/PrivateRoutes";
import Navbar from "./Components/Navbar/Navbar";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

const App = () => {
  return (
    <>
      {/* Container for displaying toast notifications */}
      <ToastContainer />

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Navigation bar */}
      <Navbar />

      {/* Define application routes */}
      <Routes>
        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
