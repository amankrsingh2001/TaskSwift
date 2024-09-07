import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./Slices/UserSlice.js";
import  userBoardReducer  from "./Slices/BoardSlice.js";
import  UserProjectListReducer  from "./Slices/ProjectListSlice.js";

const store = configureStore({
    reducer: {
       userInfo: userInfoReducer,
       userBoard: userBoardReducer,
       userProjectList: UserProjectListReducer
    }
})

export default store;