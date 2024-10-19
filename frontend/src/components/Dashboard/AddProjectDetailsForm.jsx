import { addNewProject } from "../../Slices/ProjectListSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import taskListsMocData from "../../mocks/taskListsMocData.js";

const AddProjectDetails = ({setShowAddNewProjectForm}) => {
  const [projectName, setProjectName] = useState("");
  const date = new Date();
  const dispatch = useDispatch();

  const handleAddProject = (e) => {
    e.preventDefault();
    
    if (!projectName) return alert("Please enter project name"); // show modal...
    const newProjectDetails = {
      id: nanoid(), // generate for server
      name: projectName,
      createdAt: date.toDateString().slice(4), 
      isFavourite:true,
      taskLists: [], // ... testing..
    };
    dispatch(addNewProject(newProjectDetails));
    setProjectName("");
    setShowAddNewProjectForm(false);
  };

  return (
    <form
      action=""
      className="mx-auto w-fit border border-gray-500 my-10 p-4 flex items-center justify-center"
    >
      <div className="flex gap-2">
        <label htmlFor="boardName" className="mr-4 basis-1/2">
          Board Name:
        </label>
        <input
          type="text"
          id="boardName"
          className="border border-gray-300 focus:border-gray-700 text-gray-700 py-1 px-2 bg-transparent rounded"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="enter project name"
        />
      </div>
      <button
        className=" p-2 text-md text-gray-800 border-2 border-gray-600 mx-10 text-nowrap transition active:scale-95"
        type="submit"
        onClick={handleAddProject}
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProjectDetails;
