import { createSlice, nanoid } from "@reduxjs/toolkit";
import { updateProject } from "./ProjectListSlice";

// initial fields  --> **remove in production** 
const BoardMocDataFormate = {
  id: 2,
  username:'',
  name: "Website Design",
  createdAt: "April 14 2024",
  isFavorite: true,
  taskLists: [
    {
      id:345,
      listName: "To Do",
      todos: [
        
        // current todo feilds list...
        {
        title: "first",
        description: "description of the task",
        priority: "high", // -> ["high", "medium","low"]
        dueDate: "21 Aug",
        currentCategory: { id:"78adfs", listName:"abc",},
        tags: ["ui", "ux"],
        createdBy: { username: "", profileUrl: "",}, // current log in user
        attachments: [{name:"", url:""}],
        assignees: [
          {
            id: 278992,
            profileUrl: "https://ui-avatars.com/api/?name=demo+user&background=random&color=fff",
            username: "mohit346",
          },
        ],
      }

    ],
    },
  ],
};

const initialState = {
  currentBoard: {},
  currentTodo:{}
};

export const BoardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    loadCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },

    // for whole Board
    updateCurrentBoardInfo: (state, action) => {
      state.currentBoard = {...action.payload};
    },

    // for TaskList
    addNewTaskList: (state, action) => {
      const newList = {...action.payload};
      newList.id = nanoid(); // remove -> after backend integration.
      state.currentBoard.taskLists.push(newList);
    },

    addNewTaskListWithTodos: (state, action) => {
      const newList = {...action.payload};
      newList.id = nanoid(); // remove -> after backend integration.
      if(newList.todos.length > 0){
        newList.todos = newList.todos.map(todo => { 
          todo.id = nanoid(); // remove -> after backend integration.
          todo.currentCategory.id = newList.id;
          return todo;
        })
      }
      state.currentBoard.taskLists.push(newList);
    },
    updateTaskList: (state, action) => {
      const index = state.currentBoard.taskLists.findIndex(
        (list) => list.id == action.payload.id
      );
      if (index !== -1) {
        state.currentBoard.taskLists[index] = action.payload;
      }
    },
    deleteTaskList: (state, action) => {
      state.currentBoard.taskLists = state.currentBoard.taskLists.filter(
        (list) => list.id != action.payload
      );
    },

    // for Todo
    showCurrentTodo : (state, action) => {
      const {taskListId, todoId} = action.payload;
      const taskList = state.currentBoard.taskLists.find(list => list.id == taskListId)
      if(taskList){
        const todo = taskList.todos.find(todo => todo.id == todoId)
        if(todo){
          state.currentTodo = todo;
        }
      }
    },

    addNewTodo: (state, action) => {
      const { taskListId, todo } = action.payload;
      todo.id = nanoid(); // remove -> after backend integration.
      const taskList = state.currentBoard.taskLists.find(
        (list) => list.id == taskListId
      );
      if (taskList) {
        taskList.todos.push(todo);
      }
    },

    updateTodo: (state, action) => {
      const { taskListId, todo } = action.payload;
      const taskList = state.currentBoard.taskLists.find(
        (list) => list.id == taskListId
      );
      if (taskList) {
        const index = taskList.todos.findIndex((currentTodo) => currentTodo.id == todo.id);
        if (index !== -1) {
          taskList.todos[index] = todo;
          state.currentTodo = todo;
        } 
      }
    },

    deleteTodo: (state, action) => {
      const { taskListId, todoId } = action.payload;
      const taskList = state.currentBoard.taskLists.find(
        (list) => list.id == taskListId
      );
      if (taskList) {
        taskList.todos = taskList.todos.filter((todo) => todo.id !== todoId);
        state.currentTodo = {}
      }
    },
  },
});

export default BoardSlice.reducer;
export const { loadCurrentBoard } = BoardSlice.actions;
export const boardActions = BoardSlice.actions;

export const updateBoardAndProject = (action) => (dispatch, getState) => {
    dispatch(boardActions[action.type](action.payload));
    // get the current updated state and  >>> also update in the projectList array.
    const updatedBoard = getState().userBoard.currentBoard;
    dispatch(updateProject(updatedBoard));
};