import { useDispatch, useSelector } from "react-redux";
import Task from "./Card";
import { updateBoardAndProject } from "../../../Slices/BoardSlice";

// icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { DropIndicator } from "./CardDropIndicator";
import { json } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";

const Column = ({ data }) => {
  const [showTaskMenu, setshowTaskMenu] = useState(null);
  const {
    taskLists,
    setTaskLists,
    column,
    showCurrentListMenu,
    setShowCurrentListMenu,
    setnewTaskFrom,
    setrightSidebarData,
    rightSidebarData,
  } = data;

  const [columnData, setColumnData] = useState(column);

  const currentBoard = useSelector((store) => store.userBoard.currentBoard);

  const dispatch = useDispatch();

  const handleDeleteList = (id) => {
    dispatch(
      updateBoardAndProject({
        type: "deleteTaskList",
        payload: id,
      })
    );
  };

  const handleUpdateList = (list) => {
    let currentlist = { ...list };
    currentlist.listName = "mohit pending";
    currentlist.todos = [];
    dispatch(
      updateBoardAndProject({
        type: "updateTaskList",
        payload: currentlist,
      })
    );
  };

  const handleAddNewTodo = () => {
    setnewTaskFrom();
  };

  const handleDragStart = (e, cardData) => {
    e.dataTransfer.setData("cardId", cardData.id);
    e.dataTransfer.setData("columnId", cardData.currentCategory.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
  };
  const handleDragLeave = (e) => {
    clearHighlights();
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    const currentColumnId = e.dataTransfer.getData("columnId");

    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const moveCardId = element.dataset.cardId || "-1";
    const moveToColumnId = element.dataset.columnId || "-1";
    if (moveCardId === cardId) return;
    // if same column
    if (currentColumnId === moveToColumnId) {
      const copy = [...columnData.todos];
      const cardIndex = copy.findIndex((c) => c.id == cardId);
      const updateIndex = copy.findIndex((c) => c.id == moveCardId);
      if (updateIndex === -1) return;
      const card = copy[cardIndex];
      const temp = copy[updateIndex];
      copy[cardIndex] = temp;
      copy[updateIndex] = card;
      setColumnData({ ...columnData, todos: copy });

      dispatch(
        updateBoardAndProject({
          type: "updateTaskList",
          payload: { ...columnData, todos: copy },
        })
      );
    } else {
      // find
      let copyAllTaskLists = JSON.stringify(taskLists);
      copyAllTaskLists = JSON.parse(copyAllTaskLists);

      const currentColumnIndex = copyAllTaskLists.findIndex(
        (column) => column.id == currentColumnId
      );
      const currentCard = copyAllTaskLists[currentColumnIndex].todos.find(
        (task) => task.id == cardId
      );

      if (!currentCard) return;

      const copyCard = { ...currentCard };

      // insert
      const updateColumnIndex = copyAllTaskLists.findIndex(
        (column) => column.id == moveToColumnId
      );
      const cardNewIndex = copyAllTaskLists[updateColumnIndex].todos.findIndex(
        (todo) => todo.id == moveCardId
      );
      copyCard.currentCategory.id = copyAllTaskLists[updateColumnIndex].id;

      const moveBack = moveCardId == "-1";
      if (moveBack) {
        copyAllTaskLists[updateColumnIndex].todos.push(copyCard);
      } else {
        copyAllTaskLists[updateColumnIndex].todos.splice(
          cardNewIndex,
          0,
          copyCard
        );
      }

      copyAllTaskLists[currentColumnIndex].todos = copyAllTaskLists[
        currentColumnIndex
      ].todos.filter((todo) => todo.id !== currentCard.id);

      setTaskLists([...copyAllTaskLists]);
      dispatch(
        updateBoardAndProject({
          type: "updateCurrentBoardInfo",
          payload: { ...currentBoard, taskLists: copyAllTaskLists },
        })
      );
    }
  };

  const clearHighlights = (allEls) => {
    const indicators = allEls || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 100;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-column-id="${columnData.id}"]`)
    );
  };

  useEffect(() => {
    setColumnData(column);
    // setTasks(column.todos)
  }, [columnData, taskLists]);

  return (
    columnData.listName && (
      <div
        onDrop={handleDragEnd}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        className="snap-start min-w-[240px] flex-1 bg-inherit"
        key={columnData.id}
      >
        <div className="h-fit border border-slate-300 flex flex-col px-3 py-4 rounded-3xl bg-inherit">
          <h1 className="text-gray-700  relative flex justify-between px-2 mb-2 border-b border-gray-300 pb-3">
            <span className="font-inter font-semibold text-lg capitalize flex items-center justify-center">
              <FaCaretRight className="inline" />
              <span>{columnData.listName}</span>
              <span className="w-5 h-5 ml-2 border border-gray-400 rounded-full inline-flex items-center justify-center text-xs">
                {columnData?.todos?.length}
              </span>
            </span>
            <div className="flex gap-1.5 items-center">
              <span
                className="rounded-full p-1 cursor-pointer"
                aria-hidden
                onClick={handleAddNewTodo}
              >
                <FaPlus className="text-sm" />
              </span>
              <BsThreeDotsVertical
                className="rounded-[50%] p-1 text-[24px] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  showCurrentListMenu == columnData.id
                    ? setShowCurrentListMenu(null)
                    : setShowCurrentListMenu(columnData.id);
                }}
              />
            </div>
            {showCurrentListMenu == columnData.id && (
              <div className="absolute left-[100%] top-4 z-[1] p-3 border-[1px] border-gray-300 rounded w-fit bg-white">
                <ul className="flex flex-col gap-2 *:p-2 *:text-nowrap *:border-2">
                  <li
                    className=""
                    onClick={() => handleDeleteList(columnData.id)}
                  >
                    Delete
                  </li>
                  <li className="" onClick={() => handleUpdateList(columnData)}>
                    Update
                  </li>
                  {/* <li className="" onClick={handleUpdateList}>Complete</li> */}
                </ul>
              </div>
            )}
          </h1>
          {columnData?.todos?.map((todo, index) => {
            return (
              <Task
                key={todo.id}
                data={{
                  todo,
                  handleDragStart,
                  showCurrentTask: showTaskMenu,
                  setShowCurrentTask: (id) => {
                    showTaskMenu != id
                      ? setshowTaskMenu(id)
                      : setshowTaskMenu(null);
                  },
                  showTaskDetails: () => {
                    showTaskMenu != todo.id
                      ? setrightSidebarData({
                          todoId: todo.id,
                          taskListId: columnData.id,
                          closeCurrentActiveTask: () => setshowTaskMenu(null),
                        })
                      : setrightSidebarData(null);
                  },
                }}
              />
            );
          })}
        </div>
        <DropIndicator cardId={null} columnId={columnData.id} />
      </div>
    )
  );
};

export default Column;
