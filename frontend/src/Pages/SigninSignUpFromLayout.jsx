import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import vectorImg from "../assets/user_authenticate_img/login.png";

const SigninSignUpPage = () => {
  const { pathname } = useLocation();
  return (
    <motion.section className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-blue-100 items-center">
      {/* image container */}
      <div
        className={`h-full absolute lg:relative  ${
          pathname == "/account/signup" ? "order-first" : "order-last"
        }`}
      >
        <div className="max-h-[100dvh] h-full w-full p-8 flex items-center justify-center overflow-hidden ">
          <img
            src={vectorImg}
            alt="Goalguru - Task Manager image"
            className="object-contain h-full drop-shadow-md"
          />
        </div>
      </div>

      <div className={`w-full h-full flex justify-center items-center`}>
        <div
          className={`relative grid place-items-center p-5 w-fit mx-auto rounded-lg bg-gray-50 shadow-md border-[1px] border-gray-300 `}
        >
          {/* render all form here */}

          <Outlet context={[pathname.split("/")[2]]} />
          <p className="text-gray-600 text-center text-sm font-inter mt-4">
            &copy; 2024 ALL RIGHT RESERVED
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default SigninSignUpPage;
