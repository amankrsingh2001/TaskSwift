import { Link, useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { API_URL } from "../../utils/Constents.js";
import axios from "axios";

// icons
import { HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import useRegisterUser from "../../services/useRegisterUser.js";
import Spinner from "../utils/Spinner.jsx";


const Signup = () => {
  const [userCredentials, setuserCredentials] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [hidePass, setHidePass] = useReducer((old) => !old, true);
  const [loader, setloader] = useReducer((old) => !old, false);

  const registerUser = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setloader();
    const response = await useRegisterUser( userCredentials );    
    toast[response.type](response.msg);
    if(response.type === "success") navigate("/dashboard");
    setloader();
    e.target.disabled = false;
  };

  return (
    <div className="max-w-[360px] py-6">
      <h2 className="font-poppins text-black font-medium text-3xl">
        Create an account
      </h2>
      <p className="text-gray-400 text-sm py-3 font-poppins">
        Describe yourself as clearly so that there are no mistakes.
      </p>

      <form action="#" method="post" className="w-full my-2">
        <div className="flex gap-3 justify-between items-center">
          <div className="relative rounded-lg overflow-hidden">
            <FaRegUser className="text-blue-500 rounded bg-white h-[30px] w-[30px] p-1 text-2xl absolute z-[2] top-[50%] translate-y-[-50%] left-2" />
            <input
              type="text"
              name="fName"
              id="fName"
              value={userCredentials.fName}
              required
              onChange={(e) =>
                setuserCredentials((old) => {
                  return { ...old, fName: e.target.value };
                })
              }
              className="peer w-full text-gray-900 focus:border-l-4 focus:border-l-blue-600 focus-within:border-l-4 focus-within:border-l-blue-600  focus:outline-none outline-none shadow-sm border-[2px] border-gray-300 lg:text-gray-600 text-base font-poppins bg-[#d8d8d889] pb-2 pt-5 pl-12 pr-4 rounded-lg"
            />
            <label
              htmlFor="fName"
              className="absolute text-gray-500 text-md peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 transition-all peer-focus:top-2.5 peer-focus:text-blue-600 peer-focus:text-xs peer-valid:top-2.5 peer-valid:text-gray-600 peer-valid:text-xs left-[50px] top-[50%] translate-y-[-50%] font-poppins"
            >
              First Name
            </label>
          </div>

          <div className="relative rounded-lg overflow-hidden">
            <FaRegUser className="text-blue-500 rounded bg-white h-[30px] w-[30px] p-1 text-2xl absolute z-[2] top-[50%] translate-y-[-50%] left-2" />
            <input
              type="text"
              name="lName"
              id="lName"
              value={userCredentials.lName}
              required
              onChange={(e) =>
                setuserCredentials((old) => {
                  return { ...old, lName: e.target.value };
                })
              }
              className="peer w-full text-gray-900 focus:border-l-4 focus:border-l-blue-600 focus-within:border-l-4 focus-within:border-l-blue-600  focus:outline-none outline-none shadow-sm border-[2px] border-gray-300 lg:text-gray-600 text-base font-poppins bg-[#d8d8d889] pb-2 pt-5 pl-12 pr-4 rounded-lg"
            />
            <label
              htmlFor="lName"
              className="absolute text-gray-500 text-md peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 transition-all peer-focus:top-2.5 peer-focus:text-blue-600 peer-focus:text-xs peer-valid:top-2.5 peer-valid:text-gray-600 peer-valid:text-xs left-[50px] top-[50%] translate-y-[-50%] font-poppins"
            >
              Last name
            </label>
          </div>
        </div>

        <div className="relative my-3 rounded-lg overflow-hidden">
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

        <div className="relative my-3 rounded-lg overflow-hidden">
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

        <button
          type="submit"
          className="rounded-lg bg-blue-500 hover:bg-blue-600 transition-all text-white font-poppins text-sm py-3 px-5 w-full grid place-items-center mt-6 disabled:bg-slate-500 disabled:cursor-not-allowed"
          onClick={registerUser}
        >
          {(loader && <Spinner />) || "Create account"}
        </button>
      </form>

      <div className="flex gap-2 items-center w-full px-3 my-2">
        <span className="bg-[#d8d8d8b3] h-[1px] flex-1"></span>
        <span className="text-gray-400 lg:text-gray-500 font-poppins">or</span>
        <span className="bg-[#d8d8d8b3] h-[1px] flex-1"></span>
      </div>

      <button
        type="button"
        className="border-2 border-[#eaeaea] text-gray-600 w-full py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled
      >
        Google
      </button>

      <p className="text-sm text-gray-500 text-center  font-poppins mt-3">
        Don't you have an account?
        <Link
          to={"/signin"}
          className="text-blue-500 font-bold ml-2 whitespace-nowrap hover:underline underline-offset-4 hover:text-blue-600 transition-all"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
