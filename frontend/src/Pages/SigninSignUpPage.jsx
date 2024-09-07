import { Outlet, useLocation } from "react-router-dom";

const SigninSignUpPage = () => {
  const { pathname } = useLocation();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-white items-center">
      {/* image container */}
      <div
        className={`bg-slate-700 h-full absolute lg:relative  ${ pathname == "/signup" ? "order-first" : "order-last" }`}
      ></div>
      <div
        className={`w-full bg-blue-200 h-full flex justify-center items-center`}
      >
        <div
          className={`relative grid place-items-center p-5 w-fit mx-auto rounded-lg bg-gray-50 shadow-md border-[1px] border-gray-300 `}
        >
          <Outlet /> 
          <p className="text-gray-600 text-center text-sm font-poppins mt-4">
            &copy; 2024 ALL RIGHT RESERVED
          </p>
        </div>
      </div>
    </section>
  );
};

export default SigninSignUpPage;
