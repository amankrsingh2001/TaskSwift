import { Link, useNavigate } from "react-router-dom";
import { useReducer, useState } from "react"; //removed some waste imports
import { useDispatch } from "react-redux";
import { addCurrentUser } from "../../store/Slices/UserSlice.js";

// icons
import { HiLockClosed, HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import useRegisterUser from "../../services/useRegisterUser.js";
import Spinner from "../utils/Spinner.jsx";
import { signupData } from "../../data/signinFormData.js";

const RegisterUser = () => {
  const [userCredentials, setuserCredentials] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hidePass, setHidePass] = useReducer((old) => !old, true);
  const [loader, setloader] = useReducer((old) => !old, false);

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setloader();
    const response = await useRegisterUser(userCredentials);
    response?.type && toast[response.type](response.msg);

    if (response.msg === "User created") {
      console.log(response.data);
      // user must be in the response
      const currentUser = response.response.data?.user;
      dispatch(addCurrentUser(currentUser));
      console.log(currentUser);
      // navigate to username
      navigate(`/${currentUser.username}`);
    }
    setloader();
    e.target.disabled = false;
  };

  const IconComponent = {
    FaRegUser,
    HiOutlineMail,
    MdLockOutline,
  };

  const handleFormValue = (e, type) => {
    const data = { ...userCredentials };
    data[type] = e.target.value;
    setuserCredentials(data);
  };

  return (
    <div className="max-w-[360px] py-6">
      <h2 className="font-poppins text-black font-medium text-3xl">
        {" "}
        {signupData.heading}{" "}
      </h2>
      <p className="text-gray-400 text-sm py-3 font-poppins">
        {signupData.description}
      </p>

      <form
        action="#"
        method="post"
        className="w-full my-2 flex flex-col gap-3  "
      >
        {signupData.formEls.map((el) => {
          const Icon = IconComponent[el.icon];
          return (
            <div key={el.id} className="relative rounded-lg overflow-hidden">
              <Icon
                className={`text-blue-500 rounded bg-white h-[30px] w-[30px] ${
                  el.icon == "FaRegUser" ? "p-1.5" : "p-1"
                }  font-bold text-2xl absolute z-[2] top-[50%] translate-y-[-50%] left-2`}
              />
              <input
                type={hidePass ? el.type : "text"}
                name={el.name}
                id={el.name}
                value={userCredentials[el.name]}
                required
                onChange={(e) => handleFormValue(e, el.name)}
                className="peer w-full text-gray-900 focus:border-l-4 focus:border-l-blue-600 focus-within:border-l-4 focus-within:border-l-blue-600  outline-none shadow-sm border-[2px] border-gray-300 lg:text-gray-600 text-base font-poppins bg-[#d8d8d889] pb-2 pt-5 pl-12 pr-4 rounded-lg"
              />
              <label
                htmlFor={el.name}
                className={`absolute peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 transition-all peer-focus:top-2.5 peer-focus:text-blue-600 peer-focus:text-xs  ${
                  userCredentials[el.name] != ""
                    ? "top-2.5 text-gray-600 text-xs"
                    : "top-1/2 text-gray-500 text-md"
                } left-[50px] top-[50%] translate-y-[-50%] font-poppins`}
              >
                {el.lable}
              </label>
              {el.name == "password" && (
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
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className="rounded-lg bg-blue-500 hover:bg-blue-600 transition-all text-white font-poppins text-sm py-3 px-5 w-full grid place-items-center mt-6 disabled:bg-slate-500 disabled:cursor-not-allowed"
          onClick={handleRegisterUser}
        >
          {(loader && <Spinner />) || signupData.submitButtonText}
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
        {signupData.additionalInfo.description}
        <Link
          to={signupData.additionalInfo.linkUrl}
          className="text-blue-500 font-bold ml-2 whitespace-nowrap hover:underline underline-offset-4 hover:text-blue-600 transition-all"
        >
          {signupData.additionalInfo.title}
        </Link>
      </p>
    </div>
  );
};

export default RegisterUser;
