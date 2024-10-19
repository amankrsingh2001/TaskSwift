import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AddProjectDetails from "../../components/Dashboard/AddProjectDetailsForm";
import { loadCurrentBoard } from "../../Slices/BoardSlice";

function Projects() {
  const projectList = useSelector((store) => store.userProjectList.projectList);
  const [allProjects, setAllProjects] = useState(projectList);
  const [ showAddNewProjectForm , setShowAddNewProjectForm ] = useState(false)
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const handleNewProjectForm = () => {
    setShowAddNewProjectForm(!showAddNewProjectForm);
  };

  const ShowCurrentBoard = (board) => {
    const currentBoard = { ...board };
    dispatch( loadCurrentBoard(currentBoard) );
      // updateBoardAndProject({
      //   type: "loadCurrentBoard",
      //   payload: currentBoard,
      // })

      navigation(`./${board.name.toLowerCase().split(" ").join("-")}`)
  };
  

  return (
    <main className="p-4">
      <div className=" flex justify-between items-center">
        <h1 className="text-xl font-semibold font-inter">All Projects</h1>
        <button
          onClick={handleNewProjectForm}
          className="text-[#F9F7F7] bg-[#112D4E] border hover:text-[#DBE2EF] transition px-3 py-2.5 rounded-lg text-nowrap flex items-center justify-center gap-2 text-xs font-semibold mr-4 active:scale-95"
        >
          <BiPlus className="inline text-lg" />
          New Project
        </button>
      </div>
      <div className="flex items-center gap-4 py-8 mx-4">
        {projectList.length > 0 ? (
          projectList.map((board, index) => {
            return (
              <div
                key={board.id}
                className="rounded-2xl bg-blue-100/60 shadow-lg p-4 pb-8 relative overflow-hidden"
              >
                <h1 className="text-lg font-semibold font-inter text-gray-700">
                  {board.name}
                </h1>
                <p className="text-gray-400 text-sm">{board.createdAt}</p>
                <ul className="pl-8 py-4">
                  {board.taskLists.map((column, index) => {
                    return (
                      index < 5 && (
                        <li
                          key={column.id}
                          className="text-sm font-inter font-medium after:absolute after:h-3 after:w-3 after:bg-blue-700 after:content-[''] after:rounded-full after:-left-4 capitalize after:top-1/2 after:-translate-y-1/2 relative"
                        >
                          {column.listName}
                        </li>
                      )
                    );
                  })}
                </ul>
                <button
                  onClick={() => ShowCurrentBoard(board)}
                  className="text-lg font-semibold font-inter text-gray-700 absolute bottom-0 left-0 bg-slate-400 hover:bg-slate-500 transition w-full text-center py-1"
                >
                  Open
                </button>
              </div>
            );
          })
        ) : (
          <p>No project to show create one please...</p>
        )}
      </div>
      { showAddNewProjectForm &&  <AddProjectDetails setShowAddNewProjectForm={setShowAddNewProjectForm} /> }
    </main>
  );
}

export default Projects;
