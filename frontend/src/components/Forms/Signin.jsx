import { Link, useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";

import useVerifyCredential from "../../services/useVerifyCredentials.js";
// icons
import { HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

// components
import Spinner from "../utils/Spinner.jsx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCurrentUser } from "../../store/Slices/UserSlice.js"

const Signin = () => {
  const [userCredentials, setuserCredentials] = useState({
    email: "",
    password: "",
  });
  const [hidePass, setHidePass] = useReducer((old) => !old, true);
  const [loader, setloader] = useReducer((old) => !old, false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (event) => {
    event.preventDefault();
    // debouncing...
    event.target.disabled= true;
    setloader();
    const response = await useVerifyCredential( userCredentials );
    
    response?.type && toast[response.type](response.msg);
    if (response.msg === "Success"){
      console.log(response);
      const currentUser = response.response.data?.user
      dispatch( addCurrentUser( currentUser ) )
      // navigate to username
      navigate(`/${currentUser.username}`)
    };
    setloader();
    event.target.disabled = false;
  };

  return (
    <div className="max-w-[360px] py-6">
      <h2 className="font-poppins text-black font-medium text-3xl">
        Welcome back!
      </h2>
      <p className="text-gray-400 text-sm py-3 font-poppins">
        Start tracking your progress with GoalGuru the fastest task manager
        application.
      </p>

      <form action="#" method="post" className="w-full my-2">
        <div className="relative rounded-lg overflow-hidden">
          <HiOutlineMail className="text-blue-500 rounded bg-white h-[30px] w-[30px] p-1 text-2xl absolute z-[2] top-[50%] translate-y-[-50%] left-2" />
          <input
            type="text"
            name="email"
            id="email"
            value={userCredentials.email}
            required
            onChange={(e) =>
              setuserCredentials((old) => {
                return { ...old, email: e.target.value };
              })
            }
            className="peer w-full text-gray-900 focus:border-l-4 focus:border-l-blue-600 focus-within:border-l-4 focus-within:border-l-blue-600  focus:outline-none outline-none shadow-sm border-[2px] border-gray-300 lg:text-gray-600 text-base font-poppins bg-[#d8d8d889] pb-2 pt-5 pl-12 pr-4 rounded-lg"
          />
          <label
            htmlFor="email"
            className="absolute text-gray-500 text-md peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 transition-all peer-focus:top-2.5 peer-focus:text-blue-600 peer-focus:text-xs peer-valid:top-2.5 peer-valid:text-gray-600 peer-valid:text-xs left-[50px] top-[50%] translate-y-[-50%] font-poppins"
          >
            Email
          </label>
        </div>

        <div className="relative my-4 rounded-lg overflow-hidden">
          <MdLockOutline className="text-blue-500 rounded bg-white h-[30px] w-[30px] p-1 text-2xl absolute z-[2] top-[50%] translate-y-[-50%] left-2" />
          <input
            type={hidePass ? "password" : "text"}
            name="pass"
            id="password"
            value={userCredentials.password}
            required
            onChange={(e) =>
              setuserCredentials((old) => {
                return { ...old, password: e.target.value };
              })
            }
            className="peer w-full text-gray-900 focus:border-l-4 focus:border-l-blue-600 focus-within:border-l-4 focus-within:border-l-blue-600  focus:outline-none outline-none shadow-sm border-[2px] border-gray-300 lg:text-gray-600 text-base font-poppins bg-[#d8d8d889] pb-2 pt-5 pl-12 pr-4 rounded-lg"
          />
          <label
            htmlFor="password"
            className="absolute text-gray-500 text-md peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 transition-all peer-focus:top-2.5 peer-focus:text-blue-600 peer-focus:text-xs peer-valid:top-2.5 peer-valid:text-gray-600 peer-valid:text-xs left-[50px] top-[50%] translate-y-[-50%] font-poppins"
          >
            Password
          </label>
          <button
            className="absolute right-2 top-[50%] translate-y-[-50%]"
            onClick={(e) => {
              e.preventDefault();
              setHidePass();
            }}
          >
            {hidePass ? (
              <FaRegEyeSlash className="text-slate-500 p-2 h-8 w-8" />
            ) : (
              <FaRegEye className="text-slate-500 p-2 h-8 w-8" />
            )}
          </button>
        </div>

        <div className="text-right my-3">
          <Link
            to={"/forgot-password"}
            className="text-blue-500  font-semibold text-sm font-poppins hover:text-blue-600 hover:underline underline-offset-4 transition"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg bg-blue-500 hover:bg-blue-600 transition-all text-white font-poppins text-sm py-2 px-5 w-full grid place-items-center h-[42px] disabled:bg-slate-500 disabled:cursor-not-allowed"
          onClick={handleSignIn}
        >
          {(loader && <Spinner />) || "Sign In"}
        </button>
      </form>

      <div className="flex gap-2 items-center w-full px-3 my-2">
        <span className="bg-[#d8d8d8b3] h-[1px] flex-1"></span>
        <span className="text-gray-400 lg:text-gray-500 font-poppins">or</span>
        <span className="bg-[#d8d8d8b3] h-[1px] flex-1"></span>
      </div>

      <button
        type="button"
        className="border-2 border-[#eaeaea] text-gray-600 w-full p-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled
      >
        Google
      </button>

      <p className="text-sm text-gray-500 text-center  font-poppins mt-3">
        Don't you have an account?
        <Link
          to={"/signup"}
          className="text-blue-500 font-bold ml-2 whitespace-nowrap hover:underline underline-offset-4 hover:text-blue-600 transition-all"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Signin;
