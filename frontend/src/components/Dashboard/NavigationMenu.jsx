import { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loadCurrentBoard } from "../../Slices/BoardSlice";
import { addNewProject } from "../../Slices/ProjectListSlice";
import Logo from "../common/Logo";
import taskListsMocData from "../../mocks/taskListsMocData"

// icons
import {
  IoBriefcaseOutline,
  IoSettingsOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineViewTimeline } from "react-icons/md";
import { FaUserCircle, FaStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { TiStarOutline } from "react-icons/ti";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuArrowLeftToLine } from "react-icons/lu";
import { navigationDataList } from "../../mocks/navigationMenuDataList";

const NavigationMenuList = ({ sidebarToggle, sidebarWidth, setSidebarWidth }) => {
  const [favProject, setFavProject] = useReducer((old) => !old, false);

  const [componentAllState, setComponentAllState] = useState({
    showFavProjectList: true,
    showAllProjectList: true,
    selectedNavMenuItem: 1,
  });

  const [UserProjectList, setUserProjectList] = useState([]);
  const currentUser = useSelector((store) => store.userInfo.user);
  const currentUserProjectList = useSelector(
    (store) => store.userProjectList.projectList
  );
  const dispatch = useDispatch();

  const handleAddNewProject = () => {
    const tempTextNewProject = {
      id: 2,
      name: "Text List first Project",
      createdAt: "April 14 2024",
      isFavourite: true,
      taskLists: [...taskListsMocData], // ... testing..
    };
    dispatch(addNewProject(tempTextNewProject));
    handleActiveLinkState(4);
  };

  const ShowCurrentBoard = (board) => {
    const currentBoard = { ...board };
    dispatch( loadCurrentBoard(currentBoard) );
      // updateBoardAndProject({
      //   type: "loadCurrentBoard",
      //   payload: currentBoard,
      // })
  };

  const handleSidebarWidth = (e) => {
    const sidebarEl = e.currentTarget.closest("aside");
    setSidebarWidth((old) => !old);
  };

  const handleActiveLinkState = (index, otherProp) => {
    if (!sidebarWidth) setSidebarWidth(true);

    if (otherProp) {
      setComponentAllState({
        ...componentAllState,
        selectedNavMenuItem: index,
        ...otherProp,
      });
    } else {
      setComponentAllState({
        ...componentAllState,
        selectedNavMenuItem: index,
      });
    }
  };

  useEffect(() => {
    setUserProjectList(currentUserProjectList);
  }, [currentUserProjectList]);

  const iconComponents = {
    LuLayoutDashboard,
    IoNotificationsOutline,
    IoBriefcaseOutline,
    MdOutlineViewTimeline,
    IoSettingsOutline,
  };

  return (
    <aside className={`bg-inherit py-2 h-full border-r border-gray-400 absolute top-0 md:left-0 md:relative transition overflow-y-auto ${
        sidebarToggle ? "left-0 z-[1]" : "-left-full"
      }`}
    >
      <Logo
        className={"p-2 border-b border-gray-400"}
        showText={sidebarWidth}
        sidebarControler={handleSidebarWidth}
      />
      <nav className="relative w-full bg-inherit grid grid-cols-1 grid-rows-[1fr_110px] h-[calc(100%-65px)] pr-2">
        {/** toggle icon */}
        

        {/** navigation menu */}
        { navigationDataList.map((navMenu, index) => {
          return index == 0 ? (
            <div key={navMenu.id} className="overflow-y-auto overflow-x-hidden bg-inherit h-full">
              <div className="py-2 bg-inherit">
                {sidebarWidth && (
                  <span className="w-full px-3 py-1 text-[#a3a9b3] text-sm font-medium uppercase">
                    {navMenu.name}
                  </span>
                )}
                  <ul 
                    className={`mt-2 py-2 flex flex-col gap-[6px] bg-inherit`}
                    role="list"
                  >
                {navMenu.items.map((menuLink, menuIndex) => {
                  const IconComponent = iconComponents[menuLink.icon];
                  
                  return  (
                        <li key={menuLink.id} onClick={() => handleActiveLinkState(menuLink.id)}>
                          <Link
                            to={menuLink.href}
                            className={`flex items-center px-3 py-2 text-md rounded-e-3xl cursor-pointer hover:bg-slate-200 hover:text-slate-800 hover:font-semibold transition-all  duration-200 ${
                              sidebarWidth &&
                              componentAllState.selectedNavMenuItem ==
                                menuLink.id &&
                              "pl-6"
                            } ${
                              componentAllState.selectedNavMenuItem ==
                                menuLink.id &&
                              !sidebarWidth &&
                              "pl-2"
                            } ${
                              componentAllState.selectedNavMenuItem ==
                              menuLink.id
                                ? "text-slate-800 bg-gray-200 font-semibold *:scale-110 border border-neutral-400"
                                : "text-slate-600 font-medium pl-3 *:scale-100 border border-transparent"
                            }  ${
                              !sidebarWidth
                                ? "hover:pl-6 pl-5 pr-0"
                                : "hover:pl-6"
                            } `}
                          >
                            <IconComponent
                              className={`mr-3 text-xl ${ menuIndex !== 3 &&
                                (componentAllState.selectedNavMenuItem ==
                                menuLink.id
                                  ? "custom-Stroke-width-dark"
                                  : "custom-Stroke-width-light")
                              }`}
                            />
                            {sidebarWidth && menuLink.text}
                          </Link>
                        </li> 
                      )
                  })}
                </ul>
              </div>
              {/* Fav Projects shortcut Links */}
              {sidebarWidth && <div className="border-t-[1px] border-slate-300 pt-2">
                  <button
                    className="w-full pl-3 py-1 flex justify-between gap-1 text-[#a3a9b3] text-sm font-inter font-medium items-center uppercase"
                    onClick={() =>
                      handleActiveLinkState(
                        componentAllState.selectedNavMenuItem,
                        {
                          showFavProjectList:
                            !componentAllState.showFavProjectList,
                        }
                      )
                    }
                  >
                    My favourite
                    <IoIosArrowDown
                      className={`inline-block w-8 h-8 p-[4px] ${
                        componentAllState.showFavProjectList && "rotate-180"
                      } transition-all duration-300`}
                    />
                  </button>
                  {componentAllState.showFavProjectList && (
                    <ul className="py-3 flex flex-col gap-2 pr-2">
                      {UserProjectList.filter(
                        (project) => project.isFavourite
                      ).map((project, index) => (
                        <li
                          key={project.id}
                          onClick={() => {
                            ShowCurrentBoard(project, index);
                            handleActiveLinkState(project.id);
                          }}
                        >
                          <Link
                            to={`./projects/${project.name
                              .toLowerCase()
                              .split(" ")
                              .join("-")}`}
                            className={`flex items-center gap-2 px-2 py-2 text-sm  font-medium hover:text-gray-900 text-gray-500 font-inter cursor-pointer relative hover:bg-gray-200 hover:font-semibold hover:pl-6 group rounded-e-3xl transition-all duration-200 capitalize ${
                              componentAllState.selectedNavMenuItem ==
                              project.id
                                ? "text-slate-900 bg-gray-200 gap-4 font-semibold pl-6 *:scale-110 border border-neutral-400"
                                : "text-slate-500 font-medium pl-3 *:scale-100 border border-transparent"
                            } ${
                              sidebarWidth &&
                              componentAllState.selectedNavMenuItem ==
                                project.id &&
                              "pl-6"
                            } ${!sidebarWidth && "hover:pl-4 pl-2"}`}
                          >
                            <FiExternalLink className="text-xl" />
                            <span className="inline-block w-[calc(75%)] overflow-ellipsis whitespace-nowrap overflow-hidden">
                              {project.name}
                            </span>
                            <span
                              className="inline-block ml-auto pl-2"
                              onClick={() => setFavProject()}
                            >
                              {project.isFavourite ? (
                                <FaStar className="text-yellow-500 text-2xl mr-1" />
                              ) : (
                                <TiStarOutline className="text-2xl text-gray-400 mr-1" />
                              )}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              }
            </div>
          ) : (
            <ul key={navMenu.id} className={`py-3 flex flex-col gap-2`}>
              {/* Bottom user profile links */}
              {navMenu.items.map((menuLink, index) => {
                const IconComponent = iconComponents[menuLink?.icon];
                return (
                  <li key={menuLink.id}
                    
                    onClick={() =>
                      handleActiveLinkState(
                        UserProjectList.length +
                          UserProjectList.filter((list) => list.isFavourite)
                            .length +
                          index +
                          5
                      )
                    }
                  >
                    <Link to={menuLink.href.includes('profile')  ? `${menuLink.href}/${currentUser.username}` : menuLink.href} className={`flex items-center px-3 py-2 text-md rounded-e-3xl font-medium cursor-pointer hover:pl-6 hover:bg-slate-200 hover:text-slate-800 hover:font-semibold transition-all duration-200 text-md text-gray-800 ${
                      componentAllState.selectedNavMenuItem ==
                      UserProjectList.length +
                        UserProjectList.filter((list) => list.isFavourite)
                          .length +
                        index +
                        5
                        ? "text-slate-800 bg-gray-200 font-semibold *:scale-110 border border-neutral-400"
                        : "text-slate-600 font-medium pl-3 *:scale-100 border border-transparent"
                    } ${
                      sidebarWidth &&
                      componentAllState.selectedNavMenuItem ==
                        UserProjectList.length +
                          UserProjectList.filter((list) => list.isFavourite)
                            .length +
                          index +
                          5 &&
                      "pl-6"
                    } ${
                      !sidebarWidth &&
                      componentAllState.selectedNavMenuItem ==
                        UserProjectList.length +
                          UserProjectList.filter((list) => list.isFavourite)
                            .length +
                          index +
                          5 &&
                      "pl-2"
                    } ${!sidebarWidth ? "hover:pl-6 pl-5 pr-0" : "hover:pl-6"}`}>
                 
                    {IconComponent && (
                      <IconComponent
                        className={`mr-3 text-xl ${
                          componentAllState.selectedNavMenuItem ==
                          UserProjectList.length +
                            UserProjectList.filter((list) => list.isFavourite)
                              .length +
                            index +
                            5
                            ? "custom-Stroke-width-dark"
                            : "custom-Stroke-width-light"
                        }`}
                      />
                    )}
                    {index == navMenu.items.length - 1 && (
                      <img
                        src={currentUser.profileUrl}
                        alt={`${currentUser.fullname} goalguru user`}
                        className="h-7 w-7 rounded-full mr-2"
                      />
                    )}
                    {sidebarWidth && ( index == navMenu.items.length - 1 ? currentUser.username : menuLink.text)}
                    </Link>  
                  </li>
                );
              })}
            </ul>
          );
        })}
      </nav>
    </aside>
  );
};

export default NavigationMenuList;
