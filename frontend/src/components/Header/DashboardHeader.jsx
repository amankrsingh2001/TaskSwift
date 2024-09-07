import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeCurrentUser, updateUserProfile } from "../../store/Slices/UserSlice.js";
import Logo from "../utils/Logo";

// icons
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const DashboardHeader = ({ title, sideBarMenu }) => {
  const { showLeftSideBar, setShowLeftSideBar } = sideBarMenu;
  const [showMenu, setShowMenu] = useReducer((old) => !old, false);
  const currentUser = useSelector((store) => store.userInfo.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeCurrentUser())
    navigate("/");
  }

  const handleEditProfile = () => {
    const username = 'salluBhai776';
    const email = 'my@gm.com'
    dispatch( updateUserProfile({username, email}))
  }

  return (
    <header className="justify-start gap-1 border-b border-gray-400 grid grid-cols-1 md:grid-cols-[minmax(200px,_240px)_1fr] lg:grid-cols-[minmax(200px,_300px)_1fr]">
      <div className="flex-1 p-4 flex gap-1 justify-between items-center relative">
        <div
          className="absolute left-3 -translate-y-1/2 top-[50%] border-2 border-black h-10 w-10 grid place-items-center md:hidden"
          aria-hidden
          onClick={() => setShowLeftSideBar()}
        >
          {showLeftSideBar ? (
            <IoCloseSharp className={`text-3xl scale-150`} />
          ) : (
            <TiThMenu className="text-4xl font-bold" />
          )}
        </div>
        <span className="ml-12 md:ml-0"> {title} </span>
        <input
          type="search"
          name="searchbar"
          id="searchbar"
          placeholder="Search here"
          className="bg-transparent border border-gray-400 rounded basis-1/3 w-full py-1 px-4 outline-none focus:border-gray-800"
        />
        <div
          className="flex gap-1 items-center px-2 p-1 rounded bg-transparent transition hover:bg-gray-200 relative"
          onClick={() => setShowMenu()}
        >
          <span className="w-[36px] h-[36px] rounded-full bg-gray-300 inline-block overflow-hidden">
            <img
              src={currentUser.profileUrl}
              alt={currentUser.fullname}
              className="object-cover h-full w-full"
            />
          </span>
        </div>
        {showMenu && (
          <div className="absolute shadow-lg bg-slate-50 top-[70px] right-4 z-10 py-4 px-4 border rounded-md border-gray-400 flex flex-col gap-2">
            <button className="text-nowrap p-2 px-3 border border-gray-500 rounded-md group" onClick={handleEditProfile}>
              <FaEdit className="inline mr-2 text-gray-500 text-xl group-hover:text-gray-800" />
              <span className="text-gray-500 group-hover:text-gray-800 transition-all">
                Edit Profile
              </span>
            </button>
            <button className="text-nowrap p-2 px-3 border border-gray-500 rounded-md group group-hover:text-gray-800 text-gray-500" onClick={handleLogout}>
              <CiLogout className="inline mr-2 text-gray-500 text-xl group-hover:text-gray-800" />
              <span className="text-gray-500 group-hover:text-gray-800 transition-all ">
                Sign Out
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
