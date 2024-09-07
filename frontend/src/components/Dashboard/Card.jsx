import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { motion } from "framer-motion";
// icons
import { MdAccessTime, MdRadioButtonChecked } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";

import Tag from "../utils/Tag";
import UserProfile from "../utils/UserProfile";
import useGetPriorityColor, {
  useGetTagColor,
} from "../../services/useColorGenerator";
import { DropIndicator } from "./DropIndicator";

const Task = ({ data }) => {
  const date = new Date();
  const { tags, title, description, priority, assignees, dueDate } = data.todo;
  const { showCurrentTask, setShowCurrentTask, showTaskDetails } = data;
  const [color, bgColor] = useGetPriorityColor(priority);
  const [taskCompletion, setTaskCompletion] = useState(30);
  const [randomColorIndex, setRandomColorIndex] = useState([0, 0]);

  const handleCompletionStatus = () => {
    const allSubTaks = 2; // read the value of subtasks
    const compltedSubTasks = 1;
    const finalResult = (compltedSubTasks / allSubTaks) * 100;
    return finalResult || 0.5;
  };

  useEffect(() => {
    if (randomColorIndex[0] === 0) {
      let randomValueArr = useGetTagColor();
      setRandomColorIndex(randomValueArr);
    }
    setTaskCompletion(handleCompletionStatus());
  }, []);

  const calculateRemainingDays = (dueDate) => {
    const today = date;
    const completionDate = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    completionDate.setHours(0, 0, 0, 0);

    const differenceMs = completionDate.getTime() - today.getTime();
    const daysDifference = Math.round(differenceMs / (1000 * 60 * 60 * 24));
    if (daysDifference == -1) return 0;
    return daysDifference;
  };

  return (
    <>
      <DropIndicator
        cardId={data?.todo?.id}
        columnId={data.todo.currentCategory.id}
      />

      <motion.div
        layout
        layoutId={data?.todo?.id}
        draggable={true}
        transition={{
          layout: { duration: 0.5, type: "spring" },
          default: { duration: 0.5 },
        }}
        whileHover={{
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          outline: "2px solid #a9caff",
        }}
        initial={{
          outline: "1px solid transparent",
          boxShadow: "none",
        }}
        onDragStart={(e) => data.handleDragStart(e, { ...data.todo })}
        className={`shrink-0 rounded-xl p-3 border-[1px] border-[#a9caff] outline-[2px] outline-transparent hover:outline-[#a9caff] outline-double hover:shadow-2xl w-[100%] relative cursor-grab active:cursor-grabbing hover:cursor-pointer ${
          showCurrentTask == data.todo.id && "outline-[#a9caff] shadow-2xl"
        }  bg-inherit`}
        onClick={() => {
          setShowCurrentTask(data.todo.id);
          showTaskDetails();
        }}
      >
        <header className="flex justify-between items-center">
          <div className="flex gap-1 gap-y-2 flex-wrap items-center mr-1">
            {tags.length > 0 &&
              tags.map((item, index) => {
                return (
                  item.trim() != "" && (
                    <Tag
                      key={index}
                      data={{
                        text: item,
                        color: `${randomColorIndex[0]}`,
                        bgColor: `${randomColorIndex[1]}`,
                      }}
                    />
                  )
                );
              })}
          </div>
          <Tag
            data={{
              text: priority,
              color,
              bgColor,
              className: "ml-1",
            }}
          />
        </header>
        <main className="mt-2">
          <h4 className="font-bold text-xl flex gap-1 justify-between items-center">
            {title.length < 80 ? title : title.substring(0, 80).concat("...")}
          </h4>
          <p className="text-[#b6b6b6] text-sm font-medium">
            {description.length < 100
              ? description
              : description.substring(0, 100).concat("...")}
          </p>
          <div className="h-1.5 w-full bg-gray-300 rounded-xl my-3 relative">
            <span
              className={`absolute rounded-xl top-0 left-0 h-full w-[50%] transition-all after:absolute after:h-3 after:w-3 after:rounded-full after:-right-0.5 after:bg-inherit after:-top-0.5  ${
                taskCompletion < 100 ? "after:animate-ping" : "after:hidden"
              }
                 ${taskCompletion >= 70 && "bg-green-600"} ${
                taskCompletion >= 45 && taskCompletion < 70 && "bg-yellow-500"
              } ${taskCompletion < 45 && "bg-red-600"} `}
              style={{ width: `${taskCompletion}%` }}
            ></span>
          </div>
        </main>
        <footer className="flex justify-between items-center flex-wrap gap-1 pt-1 pb-1 relative">
          <div className="relative border-1 border-black flex *:-ml-[14px] ml-5">
            {assignees.length > 0 &&
              assignees.map(
                (person, index) =>
                  index < 3 && (
                    <UserProfile
                      key={index}
                      data={{
                        href: `/user/${person.username}`,
                        src: "",
                        linkClassName: "",
                        srcClassName: "",
                      }}
                    />
                  )
              )}

            {assignees.length > 3 && (
              <span className=" text-gray-700 font-medium text-sm leading-6 h-8 w-8 rounded-[50%] bg-gray-50 relative z-0 hover:z-10  border border-gray-500/40 inline-flex justify-center items-center">
                +{assignees.length - 3}
              </span>
            )}
          </div>
          {assignees.length == 1 && (
            <p className="mx-1 text-sm font-medium flex-1 text-gray-500 leading-6">
              {assignees[0].username}
            </p>
          )}

          <span className="flex gap-1 justify-between items-center text-gray-400 text-sm">
            <IoTimeOutline className="text-lg" />
            <span className="text-md font-poppins">
              {dueDate.slice(4, -5)} {dueDate.slice(0, 4)}
            </span>
          </span>
        </footer>
      </motion.div>
    </>
  );
};
export default Task;
