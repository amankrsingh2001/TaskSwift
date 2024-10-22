import { Link, useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react"; //removed some waste imports
import { useDispatch, useSelector } from "react-redux";
import { addCurrentUser, toggleLoading } from "../../Slices/UserSlice.js";

// icons
import { HiLockClosed, HiOutlineMail } from "react-icons/hi";
import { MdEmail, MdLockOutline } from "react-icons/md";
import { FaLaravel, FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import useRegisterUser, { validateUser } from "../../services/useRegisterUser.js";
import Spinner from "../common/Spinner.jsx";
import { signupData, signinData, forgotPasswordData, newPasswordData } from "../../mocks/Signin-Signup-Pagedata.js";
import useVerifyCredential from "../../services/useAuthentication.js";
import useForgotPassword from "../../services/useForgotPassword.js";
import OTPForm from "./OTPForm.jsx";

const AuthForm = () => {
  const [userCredentials, setuserCredentials] = useState({});
  const [hidePass, setHidePass] = useReducer((old) => !old, true);
  const [showOtpForm, setShowOtpForm] = useReducer((old) => !old, false);
  const loader = useSelector( (store) => store.userInfo.loading)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formType] = useOutletContext();
  const allForms = {
    signinData,
    signupData,
    forgotPasswordData,
    newPasswordData
  }
  const data =  allForms[`${formType}Data`]

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    e.target.disabled = true;
    dispatch(toggleLoading())
    // form condition
    let response = null;
    
    if(formType.includes('signup')){
      response = await validateUser(userCredentials, setShowOtpForm);
    }else if(formType.includes('signin')){
      response = await useVerifyCredential( userCredentials );
    }else if(formType.includes('forgotPassword')){
      response = await useForgotPassword( userCredentials.email);
    }
    
    // notify
    response?.type && toast[ response.type ](response.message);
    
    if (formType.includes('signup') ?  response?.success && showOtpForm : response?.success) {
      const currentUser = response?.data;
      dispatch(addCurrentUser(currentUser));
      console.log(currentUser);
      navigate(`/dashboard`);
    }
    
    dispatch(toggleLoading())
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


  // reset the filed data.
  useEffect(()=>{
    setuserCredentials({});
  }, [formType])

  return (
    showOtpForm ? <OTPForm length={6} onSubmit={() => {console.log("Success")}}/> :
    <div className="max-w-[360px] py-6">
      <h2 className="font-inter text-black font-medium text-3xl">
        {data.heading}
      </h2>
      <p className="text-gray-400 text-sm py-3 font-inter">
        {data.description}
      </p>

      <form
        action="#"
        method="post"
        className="w-full my-2 flex flex-wrap gap-3"
      >
        {data.formEls.map((el) => {
          const Icon = IconComponent[el.icon];
          return (
            <div key={el.id} className={`relative rounded-lg  ${ el.lable.includes("name") ? "basis-[48%]" : "basis-full"}`}>
              <Icon
                className={`text-blue-500 rounded bg-white h-[30px] w-[30px] ${
                  el.icon == "FaRegUser" ? "p-1.5" : "p-1"
                }  font-bold text-2xl absolute z-[2] top-[50%] translate-y-[-50%] left-2`}
              />
              <input
                type={hidePass ? el.type : "text"}
                name={el.name}
                id={el.name}
                value={userCredentials[el.name] || ""}
                required
                onChange={(e) => handleFormValue(e, el.name)}
                className="peer w-full text-gray-900 focus:border-l-4 focus:border-l-blue-600 focus-within:border-l-4 focus-within:border-l-blue-600  outline-none shadow-sm border-[2px] border-gray-300 lg:text-gray-600 text-base font-inter py-2.5 pl-10 pr-8 rounded-lg"
              />
              <label
                htmlFor={el.name}
                className={`absolute px-1.5 py-0.5 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 transition-all peer-focus:top-0.5 peer-focus:left-4 peer-focus:text-blue-600 bg-gray-50 peer-focus:text-sm translate-y-[-50%] font-inter ${
                  userCredentials[el.name]
                    ? "top-0.5 text-gray-400 left-4 text-sm"
                    : "top-1/2 text-gray-500 left-9"
                }`}
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
        {
          formType.includes('signin') &&   <Link
          to={"/account/forgotPassword"}
          className="self-end text-blue-500 font-semibold whitespace-nowrap hover:underline underline-offset-4 hover:text-blue-600 transition-all text-sm"
        >
          Forgot Password
        </Link >
        }
        <button
          type="submit"
          className="rounded-lg bg-blue-500 hover:bg-blue-600 transition-all text-white font-inter text-sm py-3 px-5 w-full grid place-items-center mt-4 disabled:bg-slate-500 disabled:cursor-not-allowed"
          onClick={handleFormSubmit}
          disabled={ !((Object.values(userCredentials).length == data.formEls.length) && Object.values(userCredentials).every(val => val !== ""))}
        >
          {(loader && <Spinner />) || data.submitButtonText}
        </button>
      </form>

      <div className="flex gap-2 items-center w-full px-3 my-2">
        <span className="bg-[#d8d8d8b3] h-[1px] flex-1"></span>
        <span className="text-gray-400 lg:text-gray-500 font-inter">or</span>
        <span className="bg-[#d8d8d8b3] h-[1px] flex-1"></span>
      </div>

      <button
        type="button"
        className="border-2 border-[#eaeaea] text-gray-600 w-full py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled
      >
        Google
      </button>

      <p className="text-sm text-gray-500 text-center  font-inter mt-3">
        {data.additionalInfo.description}
        <Link
          to={data.additionalInfo.linkUrl}
          className="text-blue-500 font-bold ml-2 whitespace-nowrap hover:underline underline-offset-4 hover:text-blue-600 transition-all"
        >
          {data.additionalInfo.title}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
