import { createSlice } from "@reduxjs/toolkit";

// initial fields --> **remove in production** 
const testUser123 = {
  username: "demoUser123",
  email: "user123@gmail.com",
  profileUrl: "https://ui-avatars.com/api/?name=demo+user&background=random&color=fff",
  fullname:"Test User",
  projectList:[]
}

const initialState = {
  user: { ...testUser123 }, // add test user for testing...
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
  },
});

export default UserSlice.reducer;
export const { addCurrentUser, updateUserProfile, removeCurrentUser } = UserSlice.actions;
