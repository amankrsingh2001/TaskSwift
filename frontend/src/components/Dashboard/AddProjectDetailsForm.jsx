import {
    addNewProject,
    deleteProject,
    loadAllProjectList,
    updateProject,
  } from "../../store/Slices/ProjectListSlice.js";
  import { useDispatch } from "react-redux";
  import { useState } from "react";

const AddProjectDetails = ({initialData, type}) => {
    const data = new Date();
    const dispatch = useDispatch();

    const handleAddProject = (e) => {
      e.preventDefault();
      if(!formData.name ) return alert("Please enter project name")
  
      const newProjectDetails = {...formData,
        createdAt: data.toDateString().slice(4),
        taskLists: [],
      };
      dispatch(addNewProject(newProjectDetails));
    };
  
    const [formData, setFormData] = useState({
      dueData:`${data.getFullYear()}-${data.getMonth().toString().padStart(2, 0)}-${data.getDate()}`, 
      name: "",
      isFavorite: false,
    });

    return (
        <form
        action=""
        className="mx-auto w-[50%] border border-gray-500 my-10 p-4"
      >
        <div className="flex gap-2">
          <label htmlFor="boardName" className="mr-4 basis-1/2">
            Board Name:
          </label>
          <input
            type="text"
            id="boardName"
            className="border border-gray-300 focus:border-gray-700 text-gray-700 py-1 px-2 bg-transparent rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="enter project name"
          />
        </div>
        <div className="my-4 flex gap-2">
          <label htmlFor="dueDate" className="mr-4 basis-1/2">
            Due Data:
          </label>
          <input
            type="date"
            id="dueDate"
            className=" border border-gray-300 focus:border-gray-700 text-gray-700 py-1 px-2 bg-transparent rounded"
            value={formData.dueData}
            onChange={(e) =>
              setFormData({ ...formData, dueData: e.target.value })
            }
          />
        </div>
        <div className="my-4 flex gap-2">
          <label htmlFor="favorite" className="mr-4 basis-1/2">
            Favorite:
          </label>
          <input
            type="checkbox"
            id="favorite"
            className=" border border-gray-300 focus:border-gray-700 text-gray-700 py-1 px-2 bg-transparent rounded"
            checked={formData.isFavorite}
            onChange={(e) =>
            {
              console.log(e.target.value)
              setFormData({ ...formData, isFavorite: !formData.isFavorite })
            }
            }
          />
        </div>
        <button
          className=" p-2 text-md text-gray-800 border-2 border-gray-600 mx-10"
          type="submit"
          onClick={handleAddProject}
        >
          Add Project
        </button>
      </form>
    )
}

export default AddProjectDetails;