import { createSlice, nanoid } from "@reduxjs/toolkit";

// initial fields  --> **remove in production** 
const ProjectListDataFormate = [
  {
    id: 2,
    name: "Website Design",
    createdAt: "April 14 2024",
    isFavourite: true,
    tasklists:[]
  },
];

const initialState = {
  projectList: [],
};

export const ProjectListSlice = createSlice({
  name: "ProjectList",
  initialState,
  reducers: {
    loadAllProjectList: (state, action) => {
      state.projectList = action.payload;
    },

    addNewProject: (state, action) => {
      const newProject = action.payload;
      // ID comes from server no need to add.
      newProject.id = nanoid(); // remove after backend integration
      state.projectList.push(newProject);
    },

    updateProject: (state, action) => {
      const currentProject = action.payload;
      const index = state.projectList.findIndex((item) => item.id == currentProject.id);
      if(index != -1){
        state.projectList[index] = currentProject;
      }
    },

    deleteProject: (state, action) => {
      const remainingProjectList = state.projectList.filter(
        (item) => item.id != action.payload
      );
      state.projectList = remainingProjectList;
    },
  },
});

export default ProjectListSlice.reducer;
export const {
  loadAllProjectList,
  addNewProject,
  updateProject,
  deleteProject,
} = ProjectListSlice.actions;
