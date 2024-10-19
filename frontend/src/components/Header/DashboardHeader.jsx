import React from "react";
import { BiBell, BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DashboardHeader() {
  const currentUser = useSelector((store) => store.userInfo.user);
  return (
    <header className="flex gap-2 justify-between py-3 px-4 items-center flex-wrap border-b border-gray-300 mb-1">
      <div className="">
        <p className="text-xs text-gray-600">Welcome,</p>
        <h2 className="font-inter text-base font-semibold">
          {currentUser.fullname}
        </h2>
      </div>
      <div className="basis-1/2 relative">
        <BiSearch className="cursor-pointer inline-block text-lg text-gray-700 p-1.5 h-8 w-8 rounded-full absolute top-1/2 left-1 -translate-y-1/2" />
        <input
          type="search"
          className="bg-white border-none outline-none shadow-md p-2 w-full h-10 rounded-lg placeholder-shown:text-gray-400 text-gray-700 text-sm pl-10"
          placeholder="Search project, task or people..."
        />
      </div>
      <div className="flex gap-2 items-center justify-center *:cursor-pointer *:rounded-full *:p-1.5 *:shadow-md *:text-xs *:h-8 *:w-8 *:inline-block *:bg-white">
        <BiBell className="text-gray-700" />
        <Link to={"#"} className="!p-0 overflow-hidden border-2 border-white">
          <img
            src={currentUser.profileUrl}
            alt="img"
            className="h-full w-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}

export default DashboardHeader;
