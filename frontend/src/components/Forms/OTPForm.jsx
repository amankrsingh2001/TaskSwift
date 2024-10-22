import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRegisterUser, { sentOTP, validateUser } from "../../services/useRegisterUser";
import { addCurrentUser, toggleLoading } from "../../Slices/UserSlice";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import { useNavigate } from "react-router-dom";

function OTPForm({ length, onSubmit }) {

  const [OTP, setOTP] = useState(Array(length).fill(""));
  const inputRef = useRef(Array(length).fill(0));
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const [countDown, setCountDown] = useState(59);
  const loader = useSelector(store => store.userInfo.loading);

  const intervalId = useRef(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOtpInputs = (inputOtp, index) => {
    const updatedOTP = [...OTP];
    updatedOTP[index] = inputOtp;
    setOTP(updatedOTP);

    if( inputOtp.length === 1  && index < length - 1){
      inputRef.current[index + 1]?.focus();
    }

    if( inputOtp.length === 0 && index > 0 ){
      inputRef.current[index - 1]?.focus();
    }

  };

  const handleSubmitOTP = async(e) => {
try {
  
      console.log(OTP);
      dispatch(toggleLoading());
      e.target.disabled = true;
      const user = JSON.parse(localStorage.getItem('user'));
      const otp = OTP.reduce((acc,cur )=> acc+= cur, "" );
      user.otp = Number(otp);
      
      let response = await useRegisterUser(user)
      
      toast[response.type](response.message);
      console.log(response)
      if (response?.success ) {
        console.log('add user to redux');
        const currentUser = response?.data;
        dispatch(addCurrentUser(currentUser));
        console.log(currentUser);
        navigate(`/dashboard`);
      }
      
      e.target.disabled = false;
      dispatch(toggleLoading());
    } catch (error) {
      console.log(error)
      dispatch(toggleLoading());
      e.target.disabled = false;
    }

  }

  const handleResendOTP = async (e) => {
    dispatch(toggleLoading());
    if(loader) return;
    let response = await validateUser(user, () => {});
    response?.type && toast[ response.type ](response.message);
    dispatch(toggleLoading());
    setCountDown(59);

  }

  useEffect(() => {
    clearInterval(intervalId.current)
    if(countDown < 1) return;
    intervalId.current = setInterval(() => {
      setCountDown( countDown - 1);
    }, 1000);
  }, [ countDown ])

  if(!user) return; 
  return (
    <div className="text-blue-950 text-center sm:px-10 py-10">
      <h1 className="text-3xl font-inter pt-8  font-semibold">Email Verification</h1>
      <p className="">We have sent a code to your email <span className="align-top font-bold">{user.username.slice(0, 2)}***{user.username.slice(user.username.indexOf("@"))}</span></p>
      <div className="flex gap-x-2.5 sm:gap-4  justify-center items-center my-8">
        {OTP.map((optValue, index) => (
          <input
            key={index}
            maxLength={1}
            value={optValue}
            onChange={(e) => handleOtpInputs(e.target.value, index)}
            className="focus:border-2 border border-blue-700 outline-none bg-transparent p-2 rounded-md w-10 sm:w-16 aspect-square font-inter text-[26px] sm:text-[42px] font-bold text-center"
            ref={(ref) => inputRef.current[index] = ref}
            type="text"
            autoFocus={index === 0 ? true : false}
            />
        ))}
      </div>
      <button className="w-full py-2 mb-2 rounded-md bg-blue-700/90 text-white disabled:cursor-not-allowed disabled:bg-slate-500" disabled={!OTP.every(value => value !== "")} onClick={handleSubmitOTP}>{ loader ? <Spinner/> : "Verify Account" }</button>
      <p className="flex items-center justify-center">Didn't received code yet?  
        { countDown
          ? <span className="font-semibold text-gray-400 ml-1"> 00:{String(countDown).padStart(2, 0)}</span>
          : <span className="font-bold cursor-pointer underline text-blue-700 ml-1 underline-offset-2" onClick={ handleResendOTP }>{ loader ? <Spinner className={'border-blue-500 ml-2 h-[17px] w-[17px]'}/> : "Resend OTP" }</span> 
        }
      </p>
    </div>
  );
}

export default OTPForm;
