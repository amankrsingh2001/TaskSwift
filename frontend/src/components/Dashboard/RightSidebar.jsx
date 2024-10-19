import Tag from "../common/Tag";
import UserProfile from "../common/UserProfile";
import useGetPriorityColor, {
  useGetTagColor,
} from "../../services/useColorGenerator";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion} from "framer-motion"

// icons
import { IoClose } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle, FaStar, FaUserFriends } from "react-icons/fa";
import { TiStarOutline } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { FaHashtag } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { updateBoardAndProject } from "../../Slices/BoardSlice";

const RightSidebar = ({ sidebarData }) => {
  const { rightSidebarData, setrightSidebarData } = sidebarData;
  const [showMenuOption, setShowMenuOption] = useState(false);
  const [tagColors, setTagColors] = useState("");
  const dispatch = useDispatch();
  const currentTodo = useSelector((store) => store.userBoard.currentTodo);
  const { closeCurrentActiveTask } = rightSidebarData;

  useEffect(() => {
    if (!rightSidebarData) return;

    const data = {...rightSidebarData}
    delete data.closeCurrentActiveTask;
    const getTaskDetails = (data) => {
      dispatch(
        updateBoardAndProject({
          type: "showCurrentTodo",
          payload: data,
        })
      );
    };

    getTaskDetails(data);

  }, [rightSidebarData]);

  useEffect(() => {
    if (!rightSidebarData || currentTodo.title == undefined) return;

    const [priorityTextColor, priorityTextBgColor] =
      useGetPriorityColor(priority);
    const [tagColor, tagBgColor] = useGetTagColor();
    setTagColors(() => [
      tagColor,
      tagBgColor,
      priorityTextColor,
      priorityTextBgColor,
    ]);
  }, [currentTodo]);

  const handleCloseSidebar = (e) => {
    // const aside = e.currentTarget.closest("aside");
    // aside.classList.remove("show");
    // aside.classList.add("hide");
    closeCurrentActiveTask();
    setrightSidebarData(false);
    setrightSidebarData(null);
    // setTimeout(() => {
    // }, 200);
  };

  if (!rightSidebarData || currentTodo.title == undefined) return;

  const {
    tags,
    title,
    description,
    priority,
    assignees,
    dueDate,
    createdBy,
    attachements,
    currentCategory,
    isFavourite,
  } = currentTodo;

  const handleUpdateTodo = () => {
    const todo = { ...currentTodo };
    todo.title = "new";
    todo.description = "empty";
    dispatch(
      updateBoardAndProject({
        type: "updateTodo",
        payload: {
          taskListId: currentTodo.currentCategory.id,
          todo,
        },
      })
    );
  };

  const handleDeleteTodo = () => {
    dispatch(
      updateBoardAndProject({
        type: "deleteTodo",
        payload: {
          taskListId: currentTodo.currentCategory.id,
          todoId: currentTodo.id,
        },
      })
    );

    closeCurrentActiveTask();
  };

  console.log(currentTodo)

  return ( rightSidebarData && (
      <motion.aside
        initial={{
          right:'-100%'
        }}
        animate={{
          right:'0%',
        }}
        transition={{
          ease:"backInOut",
          duration:0.4,
        }}
        exit={{
          right:'-100%'
        }}
        whileInView={{
          backgroundColor:'rgb(0,0,0,0.2)',
          zIndex:10
        }}

        className={`h-full w-screen absolute top-0 z-[0]`}
        // className={`h-full bg-transparent w-screen absolute top-0 show z-[0] ${
        //   rightSidebarData && "animate-reveal-show"
        // } transition-all duration-500`}
        onClick={(e) => handleCloseSidebar(e)}
      >
        <div
          className="ml-auto min-w-[240px] max-w-[400px] bg-slate-50 w-full h-full border border-slate-300"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenuOption(false);
          }}
        >
          <header className="flex gap-2 items-center justify-between mt-3 relative border border-b-gray-400 px-4 pb-5 py-2">
            <button
              className="p-1 -ml-2 overflow-hidden rounded-full"
              onClick={(e) => handleCloseSidebar(e)}
            >
              <IoClose className="text-2xl" />
            </button>
            <BsThreeDotsVertical
              className="text-3xl hover:shadow-md rounded-full p-[2px] inline-block cursor-pointer active:scale-95 rotate-90 text-gray-500 hover:text-gray-700 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenuOption((old) => !old);
              }}
            />
            {showMenuOption && (
              <div className="absolute right-0 top-12 z-[1] p-3 border-[1px] border-gray-300 rounded w-fit bg-white">
                <ul className="flex flex-col gap-2 *:p-2 *:text-nowrap *:border-2">
                  <li className="" onClick={handleDeleteTodo}>
                    Delete
                  </li>
                  <li className="" onClick={handleUpdateTodo}>
                    Update
                  </li>
                  <li className="">Complete</li>
                </ul>
              </div>
            )}
          </header>
          <main className="px-4 py-3 mt-1">
            <div className="flex justify-between gap-2 items-center">
              <span className="text-sm font-playfairerrat font-medium capitalize text-gray-400 ">
                project &nbsp; / &nbsp; {name || "ProjectName"}
              </span>
              <span className="cursor-pointer">
                {isFavourite ? (
                  <FaStar className="text-yellow-500 text-2xl mr-2" />
                ) : (
                  <TiStarOutline className="text-2xl mr-2 text-gray-500" />
                )}
              </span>
            </div>
            <div className="flex flex-col gap-4 pr-10">
              <h2 className="font-bold text-3xl mt-5">{title}</h2>
              <p className="text-gray-500 text-sm max-h-[160px] overflow-y-auto">
                {description}
              </p>
              <div className="flex gap-2 items-center justify-between">
                <span className="text-gray-400 text-sm">
                  <FaUsers className="text-lg inline mr-2" />
                  Assigned
                </span>
                <span className="self-start basis-[60%]">
                  {assignees.map((user, index) => (
                    <UserProfile
                      key={index}
                      data={{
                        href: `/user/${user.username}`,
                        src: "",
                        linkClassName: "scale-[0.85] -ml-[12px]",
                        srcClassName: "",
                      }}
                    />
                  ))}
                </span>
              </div>
              <div className="flex gap-2 items-center justify-between -mt-2">
                <span className="text-gray-400 text-sm">
                  {priority == "high" && (
                    <FcHighPriority className="text-lg inline mr-2" />
                  )}
                  {priority == "medium" && (
                    <FcMediumPriority className="text-lg inline mr-2" />
                  )}
                  {priority == "low" && (
                    <FcLowPriority className="text-lg inline mr-2" />
                  )}
                  Priority
                </span>
                <span className="self-start basis-[60%]">
                  <Tag
                    data={{
                      text: priority,
                      color: tagColors[2],
                      bgColor: tagColors[3],
                    }}
                  />
                </span>
              </div>
              <div className="flex gap-2 items-center justify-between">
                <span className="text-gray-400 text-sm">
                  <FaHashtag className="text-lg inline mr-2" />
                  Tags:
                </span>
                <span className="self-start basis-[60%] flex gap-2">
                  {tags.map((item, index) => (
                    <Tag
                      key={index}
                      data={{
                        text: item,
                        color: tagColors[0],
                        bgColor: tagColors[1],
                      }}
                    />
                  ))}
                </span>
              </div>
              <div className="flex gap-2 items-center justify-between">
                <span className="text-gray-400 text-sm">
                  <BiCategoryAlt className="text-lg inline mr-2" />
                  Category:
                </span>
                <span className="self-start basis-[60%] flex gap-2">
                  {currentCategory.listName}
                </span>
              </div>
              <div className="flex gap-2 items-center justify-between">
                <span className="text-gray-400 text-sm">
                  <RiTimeLine className="text-lg inline mr-2" />
                  Timeline:
                </span>
                <span className="self-start basis-[60%] flex gap-2">
                  {currentTodo?.createAt?.slice(4)} - {dueDate}
                </span>
              </div>
              <div className="flex gap-2 items-center justify-between">
                <span className="text-gray-400 text-sm">
                  <GrUserAdmin className="text-lg inline mr-2" />
                  CreatedBy:
                </span>
                <span className="self-start basis-[60%] flex gap-2 text-md leading-8">
                  <UserProfile
                    data={{
                      href: `/user/${createdBy.username}`,
                      src: ``,
                    }}
                  />
                  {createdBy.username}
                </span>
              </div>
            </div>
          </main>
        </div>
      </motion.aside>
             
    )
  );
};

export default RightSidebar;
