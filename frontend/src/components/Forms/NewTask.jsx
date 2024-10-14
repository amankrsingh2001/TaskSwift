import { useEffect, useReducer, useState } from "react";

// icons
import { IoCloseCircleOutline, IoPlayOutline } from "react-icons/io5";
import { TiStarOutline } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {updateBoardAndProject} from "../../Slices/BoardSlice";
import { nanoid } from "@reduxjs/toolkit";

const NewTask = ({ newTaskFrom, setnewTaskFrom }) => {
  const curDate = new Date();
  const tabs = ["description", "Attachments"];
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [showDialogBox, setShowDialogBox] = useReducer((old) => !old, true);
  const [isSubmit, setIsSubmit] = useReducer((old) => !old, false);
  const [addNewList, setAddNewList] = useState({
    show: false,
    listName: "",
    id: 10,
  });
  const currentBoard = useSelector((store) => store.userBoard.currentBoard);
  const currentUser = useSelector((store) => store.userInfo.user);
  const dispatch = useDispatch();
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
    isFavorite: false,
    priority: [
      { name: "high", id: 1, isChecked: false },
      { name: "medium", id: 2, isChecked: true },
      { name: "low", id: 3, isChecked: false },
    ],
    assignees: [
      {
        username: "mohit346",
        profileUrl: "mohit.jpg",
        id: 2,
      },
    ],
    dueDate: curDate.toDateString().slice(4),
    createAt: curDate.toDateString(),
    availableCategory: currentBoard.taskLists.map((list) => {
      return { id: list.id, listName: list.listName };
    }),
    currentCategory: {
      id: currentBoard.taskLists?.[0]?.id,
      listName: currentBoard.taskLists?.[0]?.listName,
    },
    tags: [],
    createdBy: {
      username: currentUser.username,
      profileUrl: currentUser.profileUrl,
    },
    attachments: [],
  });

  useEffect(() => {
    // stop scrolling effect
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => {
      const body = document.querySelector("body");
      body.style.overflow = "auto";
    };
  }, [newTaskFrom]);

  useEffect(() => {
    if(currentBoard.taskLists.length == 0){
      setAddNewList({...addNewList, show:true});
    }
  }, []);

  const handlePriorityLevel = (e, index) => {
    const updatePriority = newTaskData.priority;
    updatePriority.forEach((priority, i) => {
      index == i ? (priority.isChecked = true) : (priority.isChecked = false);
    });
    setNewTaskData({
      ...newTaskData,
      priority: updatePriority,
    });
  };

  const handleCloseForm = (e) => {
    setShowDialogBox();
    setTimeout(() => {
      setnewTaskFrom();
    }, 250);
  };

  const handleAddAttachments = (e) => {
    const filePath = e.target.value;
    const updateTaskData = { ...newTaskData };
    updateTaskData.attachments[0] = filePath;
    setNewTaskData(updateTaskData);
  };

  const submitTaskData = (e) => {
    e.preventDefault();
    setIsSubmit();
    const setPriority = newTaskData.priority.find((p) => p.isChecked == true);
    const newTodo = { ...newTaskData };
    newTodo.priority = setPriority.name;

    if (addNewList.listName) {
      newTodo.currentCategory.listName = addNewList.listName;
      const newList = {
        listName: addNewList.listName,
        todos: [newTodo],
      };

      dispatch(
        updateBoardAndProject({
          type: "addNewTaskListWithTodos",
          payload: newList,
        })
      );
    } else {
      // const taskListId = newTaskData.currentCategory.id;
      dispatch(
        updateBoardAndProject({
          type: "addNewTodo",
          payload: { taskListId: newTodo.currentCategory.id, todo: newTodo },
        })
      );
    }
    // close for now
    setTimeout(() => {
      setIsSubmit();
      setnewTaskFrom();
    }, 600);
  };

  return (
    newTaskFrom && (
      <div className="absolute top-0 left-0 w-full z-[2] min-h-screen bg-slate-400/30 grid place-items-center" onClick={handleCloseForm}>
        <div
          className={`w-full sm:w-[75%] max-w-[550px] h-full sm:h-auto overflow-x-hidden relative bg-slate-100 border-[1px] border-slate-300 shadow-md sm:rounded-lg py-4 px-6 opacity-100 flex gap-1 flex-col ${
            showDialogBox ? "animate-show-box " : "animate-hide-box"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`absolute left-0 top-0 h-[6px] sm:rounded w-full bg-black ${
              isSubmit && "animate-moving"
            }`}
          ></div>

          <header className="flex justify-between mb-2">
            <button onClick={handleCloseForm} className="p-1">
              <IoCloseCircleOutline className="text-2xl text-gray-500 hover:text-gray-900 font-bold transition" />
            </button>

            <p className=" text-gray-400 font-poppins">Add new task</p>

            <button
              onClick={() =>
                setNewTaskData({
                  ...newTaskData,
                  isFavorite: !newTaskData.isFavorite,
                })
              }
            >
              {newTaskData?.isFavorite ? (
                <FaStar className="text-yellow-500 text-2xl" />
              ) : (
                <TiStarOutline className="text-2xl text-gray-400" />
              )}
            </button>
          </header>

          <form
            className={`py-2 ${
              isSubmit && "blur-[1px]"
            } flex-1 flex flex-col gap-1`}
            method="post"
            action="#"
          >
            <header>
              <input
                id="title"
                type="text"
                value={newTaskData.title}
                placeholder="Untitled"
                className="text-3xl font-medium text-slate-800 bg-transparent placeholder:text-gray-400 w-full outline-none my-1 pr-2"
                onChange={(e) =>
                  setNewTaskData({
                    ...newTaskData,
                    title: e.target.value,
                  })
                }
              />
              <div className="my-2">
                <p className="text-slate-400 text-md mr-6 inline-block">
                  Priority:
                </p>
                <span className="inline-flex gap-2 items-center">
                  {newTaskData.priority.map((priority, index) => (
                    <span key={priority.id}>
                      <input
                        type="radio"
                        name="priority"
                        id={priority.name}
                        className={`hidden peer`}
                        checked={priority.isChecked}
                        onChange={(e) => handlePriorityLevel(e, index)}
                      />
                      <label
                        htmlFor={priority.name}
                        className={`peer-checked:bg-slate-800 border peer-checked:border-slate-100 text-[11px] peer-checked:text-slate-200 text-slate-500 bg-slate-100 border-slate-500 rounded-full px-2 py-1 leading-none cursor-pointer capitalize`}
                      >
                        {priority.name}
                      </label>
                    </span>
                  ))}
                </span>
              </div>
            </header>
            <div className="border-t-2 py-2 flex gap-2 flex-col flex-1">
              <div className="flex gap-2 items-center">
                <span className="text-gray-500 basis-1/4 text-sm mr-2">
                  Assignees
                </span>

                <div className="flex gap-1 items-center flex-1 w-[70%]">
                  <ul className="no-scrollbar overflow-x-auto overflow-y-hidden w-fit flex gap-1">
                    {newTaskData?.assignees.map((user) => (
                      <li
                        key={user.id}
                        className="flex gap-1 items-center px-2 p-1 bg-gray-200 rounded-full"
                      >
                        <span className="w-[18px] h-[18px] rounded-full bg-gray-400 inline-block overflow-hidden">
                          <img
                            src={user.profileUrl}
                            alt=""
                            className="object-cover h-full w-full"
                          />
                        </span>
                        <span className="text-xs text-slate-800 font-medium text-nowrap">
                          {user.username}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="text-xs leading-none rounded-full bg-gray-200 px-[6px] py-2 text-gray-500 hover:text-gray-800 cursor-pointer text-nowrap disabled:cursor-not-allowed disabled:text-gray-400"
                    disabled
                  >
                    Add More
                  </button>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <span className="text-gray-500 basis-1/4 text-sm mr-2">
                  Due date
                </span>
                <label htmlFor="datePicker" className="mr-2">
                  {newTaskData.dueDate}
                </label>
                <input
                  id="datePicker"
                  type="date"
                  className="bg-transparent outline-none text-md w-[30px] p-1 cursor-pointer"
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setNewTaskData({
                      ...newTaskData,
                      dueDate: date,
                    });
                  }}
                />
              </div>

              <div className="flex gap-2 items-center">
                <span className="text-gray-500 basis-1/4 text-sm mr-2">
                  Category
                </span>
                <select
                  name="category"
                  className="bg-transparent p-1 border border-slate-400 rounded w-full basis-[calc(75%-16px)]"
                  id="category"
                  value={newTaskData.currentCategory.id}
                  onChange={(e) => {
                    let currentCategory = null;
                    currentCategory = newTaskData.availableCategory.find(
                      (c) => c.id == e.target.value
                    );
                    if (currentCategory) {
                      setAddNewList({ ...addNewList, listName:"", show: false });
                      setNewTaskData({
                        ...newTaskData,
                        currentCategory,
                      });
                    } else {
                      setAddNewList({ ...addNewList, listName:"", show: true });
                      setNewTaskData({
                        ...newTaskData,
                        currentCategory: {
                          id: addNewList.id,
                          listName: addNewList.listName,
                        },
                      });
                    }
                  }}
                >
                  {newTaskData.availableCategory.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.listName}
                    </option>
                  ))}
                  <option value={addNewList.id}>Add New List</option>
                </select>
              </div>

              {addNewList.show && (
                <div className="flex gap-2 items-center">
                  <span className="text-gray-500 basis-1/4 text-sm mr-2">
                    List Name:
                  </span>
                  <input
                    id="newListName"
                    type="text"
                    value={addNewList.listName}
                    placeholder="Enter List Name"
                    className="outline-none bg-transparent rounded p-1 text-gray-500 text-[14px] border-[2px] border-gray-300 transition flex-1 placeholder:text-gray-400  focus:border-gray-500"
                    onChange={(e) => {
                      setAddNewList({
                        ...addNewList,
                        listName: e.target.value,
                      });
                    }}
                  />
                </div>
              )}

              <div className="flex gap-2 items-center">
                <span className="text-gray-500 basis-1/4 text-sm mr-2">
                  Tags
                </span>
                <div className="flex flex-col flex-wrap gap-1  w-full basis-[calc(75%-16px)] overflow-x-auto">
                  <input
                    type="text"
                    placeholder="Graphics, Marketing, etc..."
                    value={newTaskData.tags.toString()}
                    className="outline-none bg-transparent rounded p-1 text-gray-500 text-[14px] border-[2px] border-gray-300 transition flex-1 placeholder:text-gray-400  focus:border-gray-500"
                    onChange={(e) => {
                      let value = e.target.value.split(",");
                      if (value.toString() == "") value = [];
                      setNewTaskData({
                        ...newTaskData,
                        tags: value,
                      });
                    }}
                  />
                  <div className="overflow-x-auto no-scrollbar w-full">
                    <ul className="overflow-x-auto flex gap-1 no-scrollbar w-full">
                      {newTaskData.tags.length > 0 &&
                        newTaskData.tags
                          .filter((tag) => tag.trim() != "")
                          .map((tag, index) => (
                            <li
                              key={index}
                              className={`border-gray-300 bg-gray-800 rounded ${
                                newTaskData.tags.length > 0 &&
                                "border px-[6px] py-1"
                              } text-gray-100 text-[10px] cursor-pointer hover:text-gray-800 hover:border-gray-600 
                        hover:bg-gray-200 transition`}
                            >
                              {tag}
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <span className="text-gray-500 basis-1/4 text-sm mr-2">
                  Created By
                </span>
                <span className="flex gap-1 items-center px-2 p-1 bg-gray-200 rounded-full">
                  <span className="w-[18px] h-[18px] rounded-full bg-gray-400 inline-block overflow-hidden">
                    <img
                      src={newTaskData.createdBy.profileUrl}
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  </span>
                  <span className="text-xs text-slate-800 font-medium text-nowrap">
                    {newTaskData.createdBy.username}
                  </span>
                </span>
              </div>

              <div className="flex gap-2 flex-col flex-1 max-h-[300px]">
                <div className="pb-2 flex gap-2">
                  {tabs.map((tab, index) => (
                    <button
                      key={index}
                      className={`text-gray-600 border-b-[3px] text-sm mr-2 p-1 ${
                        currentTab == tab
                          ? "border-black"
                          : "border-transparent"
                      } cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400`}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentTab(tab);
                      }}
                      disabled={tab != "description"}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {currentTab == "description" ? (
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Write here more details..."
                    className="min-h-[20px] h-full resize-none bg-transparent border border-gray-300 focus:border-gray-500 text-sm p-2"
                    value={newTaskData.description}
                    onChange={(e) =>
                      setNewTaskData({
                        ...newTaskData,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="min-h-[20px] h-fit max-h-[100px] border border-gray-300 focus:border-gray-500 text-sm p-2">
                    <input
                      type="file"
                      name="attachments"
                      id="attachments"
                      value={newTaskData.attachments?.[0] || ""}
                      onChange={handleAddAttachments}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>

          <footer className="flex justify-between items-center pt-2">
            <span className="text-gray-500 ml-2 sm:text-md text-sm">
              Create At: {curDate.toDateString()}
            </span>
            <button
              className="bg-slate-900 p-2 px-3 font-poppins text-md text-white rounded opacity-100 hover:opacity-80 transition-opacity active:scale-[0.98]"
              onClick={(e) => submitTaskData(e)}
            >
              Create Task
            </button>
          </footer>
        </div>
      </div>
    )
  );
};

export default NewTask;
