import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../components/Dashboard/BoardView/Card.jsx";
import NewTask from "../../components/Forms/NewTask.jsx";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import RightSidebar from "../../components/Dashboard/RightSidebar.jsx";
import { AnimatePresence, motion } from "framer-motion";

// icons
import { FaPlus, FaStar } from "react-icons/fa6";
import { IoFilterSharp, IoStarOutline } from "react-icons/io5";
import Column from "../../components/Dashboard/BoardView/Column.jsx";
import { BiBell, BiSearch } from "react-icons/bi";
import { TiStarOutline } from "react-icons/ti";


import { updateBoardAndProject } from "../../Slices/BoardSlice.js";
import { deleteProject, updateProject } from "../../Slices/ProjectListSlice.js";
import UserProfile from "../../components/common/UserProfile.jsx";
import { combineSlices } from "@reduxjs/toolkit";
import DashboardHeader from "../../components/Header/DashboardHeader.jsx";


const BoardOverview = () => {
  const [showCurrentListMenu, setShowCurrentListMenu] = useState(null);
  const [currentListFilter, setCurrentListFilter] = useState(0);
  const [rightSidebarData, setrightSidebarData] = useState(null);
  const currentBoardData = useSelector((store) => store.userBoard.currentBoard);
  const currentUser = useSelector((store) => store.userInfo.user);
  const [isFavourite, setisFavourite] = useState(currentBoardData.isFavourite)
  const [taskLists, setTaskLists] = useState(currentBoardData.taskLists);
  const [filteredTaskLists, setFilteredTaskLists] = useState(taskLists);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [setnewTaskFrom] = useOutletContext();
  const date = new Date();

  useEffect(() => {
    setTaskLists(currentBoardData.taskLists);
    setFilteredTaskLists(currentBoardData.taskLists);
  }, [currentBoardData]);

  const updateCurrentBoardData = () => {
    const updateBoard = { ...currentBoardData };
    updateBoard.name = "mohit";
    dispatch(
      updateBoardAndProject({
        type: "updateCurrentBoardInfo",
        payload: updateBoard,
      })
    );
  };

  const deleteCurrentBoardData = () => {
    dispatch(deleteProject(currentBoardData.id));
    navigate(`/${currentUser.username}`);
  };

  const addNewTask = () => {
    setnewTaskFrom();
  };

  const filterList = (id) => {
    const filterListitems = taskLists.filter((list) =>
      id === 0 ? list : list.id === id
    );
    setCurrentListFilter(id);
    setFilteredTaskLists(filterListitems);
  };

  const [newTaskListValue, setNewTaskListValue] = useState(""); // temp testing... tasklist form..

  const handleAddNewList = () => {
    const newTaskList = {
      listName: newTaskListValue,
      todos: [],
    };
    if (!newTaskListValue) return alert("Please Add list Name.");
    dispatch(
      updateBoardAndProject({
        type: "addNewTaskList",
        payload: newTaskList,
      })
    );
    setNewTaskListValue("");
  };

  const handleListMenuClose = () => {
    if (showCurrentListMenu) {
      setShowCurrentListMenu(null);
    }
  };

  const handleFavouriteBoard = () => {
    // make a request and update the data...
    setisFavourite(!isFavourite);
    dispatch(updateBoardAndProject({
      type:'updateCurrentBoardInfo',
      payload:{
        ...currentBoardData, 
        isFavourite : !isFavourite
      }
    }))
  };
  // if data is empty then show shimmer UI
  // return <ShimmerUi/>

  // then show this if data is not empty..
  console.log(currentBoardData)
  return (
    <>
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-full h-full overflow-hidden bg-inherit relative"
          onClick={handleListMenuClose}
        >                     
          <main className="flex-1 bg-[#dbe2ef75] h-full max-h-[calc(100%-100px)] px-4">
            <div className="bg-inherit border rounded-2xl mt-4 border-gray-300 w-full flex justify-between gap-2 p-2 px-4 mb-4">
              <div className="flex justify-between items-center flex-1 border-r border-gray-300 pr-4">
                <div>
                  <h3 className="text-xl font-semibold font-inter">
                    {currentBoardData.name}
                  </h3>
                    <span className="text-xs text-gray-500 font-normal inline-block -mt-6">Created at: {currentBoardData.createdAt}</span>
                </div>

                <div className="flex items-center justify-center *:relative *:-ml-3 pl-3 pt-2">
                  {/* // mapping team mambers.. */}
                  <UserProfile data={{ href: "", src: "" }} />
                    <span className=" text-gray-900 font-semibold text-xs leading-6 h-8 w-8 rounded-[50%] bg-gray-300 relative z-0 hover:z-10 border-[3px] border-gray-50 inline-flex justify-center items-center">+6</span>
            {/* {not show more than 4 directly} */}
                  {/* { assignees.length > 3 && (
              <span className=" text-gray-700 font-medium text-sm leading-6 h-8 w-8 rounded-[50%] bg-gray-50 relative z-0 hover:z-10  border border-gray-500/40 inline-flex justify-center items-center">
              + {assignees.length - 3  }
              </span>
              )} */}
              <button onClick={handleFavouriteBoard} className="text-[#3F72AF] bg-white p-1 rounded-full text-xl h-10 w-10 !ml-5 flex items-center justify-center">
          {isFavourite ? <FaStar className="text-yellow-500"/> : <TiStarOutline className="text-gray-700"/>}
          </button>
                </div>
              </div>

              <div className="flex justify-center items-center gap-2">
                <button className="border hover:bg-gray-100 border-[#3F72AF] text-[#3F72AF] transition px-3 py-2 rounded-lg text-nowrap ml-2 flex items-center text-xs font-semibold justify-center gap-2">
                  <IoFilterSharp className="text-sm"/> Filters
                </button>
                <button
                  onClick={addNewTask}
                  className="text-[#F9F7F7] bg-[#112D4E] border hover:text-[#DBE2EF] transition px-3 py-2.5 rounded-lg text-nowrap flex items-center justify-center gap-2 text-xs font-semibold"
                >
                  <FaPlus className="text-sm" /> Create task
                </button> 
              </div>
            </div>
            { taskLists.length > 0  && 
            <div
              className={`bg-inherit grid gap-4 overflow-y-auto overflow-x-auto snap-mandatory snap-x h-full w-full max-h-[calc(100%-80px)] hide-scrollbar mb-8`}
              style={{
                gridTemplateColumns: `repeat(${taskLists.length}, minmax(auto, 280px))`,
              }}
            >
              {filteredTaskLists.map((list) => (
                <Column
                  key={list.id}
                  data={{
                    showCurrentListMenu,
                    taskLists,
                    setTaskLists,
                    setShowCurrentListMenu,
                    setnewTaskFrom,
                    setrightSidebarData,
                    rightSidebarData,
                    column: list,
                  }}
                />
              ))}
            </div>
            }
          </main>
        </motion.section>

        {rightSidebarData && (
          <RightSidebar
            sidebarData={{
              rightSidebarData,
              setrightSidebarData,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default BoardOverview;
