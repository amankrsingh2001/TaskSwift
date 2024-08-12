import { useLocation } from "react-router-dom";
import Signin from "../components/Forms/Signin.jsx";
import Signup from "../components/Forms/SignUp.jsx";

const Signin_SignUp = () => {
    const { pathname } = useLocation();
  
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-white items-center">
      {/* image container */}
      <div className={`bg-slate-700 h-full absolute lg:relative  ${pathname == "/signin" ? 'order-last' : ''}`}></div>
      <div className="relative grid place-items-center p-5 w-fit mx-auto rounded-lg bg-gray-50 shadow-md border-[1px] border-gray-300">
        { (location.pathname === "/signup") ? <Signup /> : <Signin /> }
        <p className="text-gray-600 text-center text-sm font-poppins mt-4">
          &copy; 2024 ALL RIGHT RESERVED
        </p>
      </div>
    </section>
  );
};

export default Signin_SignUp;
