import { createSlice } from "@reduxjs/toolkit";

// initial fields --> **remove in production** 
const testUser123 = {
  username: "demoUser123",
  email: "user123@gmail.com",
  fullname:"Test User",
  projectList:[]
}

const initialState = {
  user: { ...testUser123 }, // add test user for testing...
  token:localStorage.getItem("token") ? localStorage.getItem('token') : null,
  loading:false
  // user: null,
};

export const UserSlice = createSlice({
  name: "CurrentUserInfo",
  initialState,
  reducers: { 
    addCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    removeCurrentUser: (state, action) => {
      state.user = null;
    },
    updateUserProfile : (state, action) => {
      state.user = {...state.user, ...action.payload} ;
    },
    setToken :(state, action) =>{
      state.token = action.payload
    },
    toggleLoading : (state, action) => {
      state.loading = !state.loading;
    }
  },
});

export default UserSlice.reducer;
export const { addCurrentUser, updateUserProfile, removeCurrentUser,setToken, toggleLoading } = UserSlice.actions;
