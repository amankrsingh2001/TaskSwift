import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./BoardView/Card.jsx";
import NewTask from "../Forms/NewTask.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import RightSidebar from "./RightSidebar.jsx";
import { AnimatePresence, motion } from "framer-motion";

// icons
import { CiMoneyCheck1, CiRuler, CiSettings } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";

import { updateBoardAndProject } from "../../Slices/BoardSlice.js";
import {
  deleteProject,
  updateProject,
} from "../../Slices/ProjectListSlice.js";

import { RiDropdownList } from "react-icons/ri";
import { IoPlayOutline } from "react-icons/io5";
import Column from "./BoardView/Column.jsx";

const BoardOverview = () => {
  const [taskLists, setTaskLists] = useState([]);
  const [filteredTaskLists, setFilteredTaskLists] = useState(taskLists);
  const [showCurrentListMenu, setShowCurrentListMenu] = useState(null);
  const [currentListFilter, setCurrentListFilter] = useState(0);
  const [rightSidebarData, setrightSidebarData] = useState(null);
  const currentBoardData = useSelector((store) => store.userBoard.currentBoard);
  const currentUser = useSelector((store) => store.userInfo.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [setnewTaskFrom] = useOutletContext();

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

  // if data is empty then show shimmer UI
  // return <ShimmerUi/>

  // then show this if data is not empty..
  return (
    <>
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="px-4 bg-inherit max-w-full h-full flex flex-col gap-2 overflow-hidden"
          onClick={handleListMenuClose}
        >
          <header className="flex gap-2 justify-between py-4 items-center flex-wrap">
            <h1 className="text-2xl text-slate-800 sm:text-3xl md:text-4xl font-bold">
              {currentBoardData.name}
            </h1>
            <p className="mr-4 text-sm text-gray-500 bg-slate-200 rounded-lg leading-none py-2 px-4">
              TimeLine :
              <span className="text-gray-600 font-medium font-montserrat ml-1">
                {currentBoardData.createdAt}
              </span>
            </p>
            <button onClick={updateCurrentBoardData}>Update board</button>
            <button onClick={deleteCurrentBoardData}>Delete board</button>
            <div className="flex-1 w-full">
              <input
                type="text"
                value={newTaskListValue}
                onChange={(e) => setNewTaskListValue(e.target.value)}
                className="border border-black px-2 py-1"
              />
              <button
                className="p-2 border border-gray-600 ml-4"
                onClick={handleAddNewList}
              >
                Add new List
              </button>
            </div>
          </header>

          <main className="flex-1 max-h-[calc(100%-100px)] bg-gray-100">
            <div className="bg-inherit rounded-xl border border-gray-300 shadow-md w-full flex justify-between gap-2 p-2 mb-4">
              <div className="flex gap-2 items-center max-w-[60%] overflow-x-auto hide-scrollbar">
                <button
                  className={`text-gray-500 border border-gray-300 px-3 py-1 rounded-lg text-nowrap bg-slate-50 group hover:text-slate-100 transition-all hover:bg-slate-800 ${
                    currentListFilter === 0 && "text-slate-100 bg-slate-900"
                  }`}
                  onClick={() => filterList(0)}
                >
                  All Task
                  <span
                    className={`ml-2 inline-block min-w-5 border border-slate-300 rounded-full p-[2px] text-[10px] transition-all text-black group-hover:text-slate-100 ${
                      currentListFilter === 0 && "text-slate-100"
                    }`}
                  >
                    {taskLists.reduce(
                      (acc, cur) => (acc += cur.todos.length),
                      0
                    )}
                  </span>
                </button>

                {taskLists.map((list, index) => (
                  <button
                    key={index}
                    className={`text-gray-500 border border-gray-300 px-3 py-1 rounded-lg text-nowrap bg-slate-50 group hover:text-slate-100 transition-all hover:bg-slate-800 capitalize ${
                      currentListFilter === list?.id &&
                      "text-slate-100 bg-slate-900"
                    }`}
                    onClick={() => filterList(list?.id)}
                  >
                    {list?.listName}
                    <span
                      className={`ml-2 inline-block min-w-5 border border-slate-300 rounded-full p-[2px] text-[10px] transition-all text-black group-hover:text-slate-100 ${
                        currentListFilter == list?.id && "text-slate-100"
                      }`}
                    >
                      {list?.todos.length}
                    </span>
                  </button>
                ))}
              </div>

              <div>
                <button className="text-gray-100 bg-slate-950 border border-gray-100 hover:bg-gray-100 hover:border-slate-950 hover:text-slate-950 transition px-3 py-1 rounded-lg text-nowrap ml-2">
                  Sort
                </button>
                <button
                  onClick={addNewTask}
                  className="text-gray-100 bg-blue-950 border border-gray-100 hover:bg-gray-100 hover:border-blue-700 hover:text-blue-700 transition px-3 py-1 rounded-lg text-nowrap ml-2"
                >
                  + New
                </button>
              </div>
            </div>

            <div
              className={`bg-inherit grid gap-4 overflow-y-auto overflow-x-auto snap-mandatory snap-x h-full w-full max-h-[calc(100%-80px)] hide-scrollbar my-8`}
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
