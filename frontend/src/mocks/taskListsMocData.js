import { nanoid } from "@reduxjs/toolkit";

const taskListsMocData = [
  {
    listName: "To Do",
    id:1,
    todos: [
      { id:nanoid(),
        title: "Title 1",
        description:
          " Descriptioin Lorem, ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam maiores quasi fuga nesciunt quos officiis sequi id est vitae sapiente facilis blanditiis, asperiores, impedit minus exercitationem tempore voluptas totam, sed facere aperiam. Accusamus soluta voluptates facere vel, deleniti aut!",
        isFavorite: true,
        priority: "high",
        assignees: [
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
        ],
        currentCategory: {id:"1", listName:"To do"},
        tags: ["designer", "UX", "UI"],
        attachements: [],
        createdBy: {
          username: "Self",
          profileUrl: "owner.jpg",
        },
        dueDate: "Aug 29 2024",
      },
      { id:nanoid(),
        title: "Development task",
        description:
          " Descriptioin Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim, nulla.  Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam maiores quasi fuga nesciunt quos officiis sequi id est vitae sapiente facilis blanditiis, asperiores, impedit minus exercitationem tempore voluptas totam, sed facere aperiam. Accusamus soluta voluptates facere vel, deleniti aut!",
        isFavorite: true,
        priority: "low",
        assignees: [{ profileUrl: "", username: "Jane smith" }],
        currentCategory: {id:"1", listName:"To do"},
        tags: ["frontend", "mern", "react"],
        attachements: [],
        createdBy: {
          username: "aman",
          profileUrl: "owner.jpg",
        },
        dueDate: "Sep 29 2024",
      }
    ],
  },
  {
    listName: "completed",
    id:2,
    todos: [
      { id:nanoid(),
        title: "Title 1",
        description:
          " Descriptioin Lorem, ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam maiores quasi fuga nesciunt quos officiis sequi id est vitae sapiente facilis blanditiis, asperiores, impedit minus exercitationem tempore voluptas totam, sed facere aperiam. Accusamus soluta voluptates facere vel, deleniti aut!",
        isFavorite: true,
        priority: "high",
        assignees: [
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
        ],
        currentCategory: {id:"2", listName:"To do"},
        tags: ["designer", "UX", "UI"],
        attachements: [],
        createdBy: {
          username: "Self",
          profileUrl: "owner.jpg",
        },
        dueDate: "Aug 29 2024",
      },
      { id:nanoid(),
        title: "Development task",
        description:
          " Descriptioin Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim, nulla.  Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam maiores quasi fuga nesciunt quos officiis sequi id est vitae sapiente facilis blanditiis, asperiores, impedit minus exercitationem tempore voluptas totam, sed facere aperiam. Accusamus soluta voluptates facere vel, deleniti aut!",
        isFavorite: true,
        priority: "low",
        assignees: [{ profileUrl: "", username: "Jane smith" }],
        currentCategory: {id:"2", listName:"To do"},
        tags: ["frontend", "mern", "react"],
        attachements: [],
        createdBy: {
          username: "aman",
          profileUrl: "owner.jpg",
        },
        dueDate: "Sep 29 2024",
      }
    ],
  },
  {
    listName: "pending",
    id:3,
    todos: [
      { id:nanoid(),
        title: "Title 1",
        description:
          " Descriptioin Lorem, ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam maiores quasi fuga nesciunt quos officiis sequi id est vitae sapiente facilis blanditiis, asperiores, impedit minus exercitationem tempore voluptas totam, sed facere aperiam. Accusamus soluta voluptates facere vel, deleniti aut!",
        isFavorite: true,
        priority: "high",
        assignees: [
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
          { profileUrl: "", username: "Mohit" },
        ],
        currentCategory: {id:"3", listName:"To do"},
        tags: ["designer", "UX", "UI"],
        attachements: [],
        createdBy: {
          username: "Self",
          profileUrl: "owner.jpg",
        },
        dueDate: "Aug 29 2024",
      },
      { id:nanoid(),
        title: "Development task",
        description:
          " Descriptioin Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim, nulla.  Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam maiores quasi fuga nesciunt quos officiis sequi id est vitae sapiente facilis blanditiis, asperiores, impedit minus exercitationem tempore voluptas totam, sed facere aperiam. Accusamus soluta voluptates facere vel, deleniti aut!",
        isFavorite: true,
        priority: "low",
        assignees: [{ profileUrl: "", username: "Jane smith" }],
        currentCategory: {id:"3", listName:"To do"},
        tags: ["frontend", "mern", "react"],
        attachements: [],
        createdBy: {
          username: "aman",
          profileUrl: "owner.jpg",
        },
        dueDate: "Sep 29 2024",
      }
    ],
  },
];

export default taskListsMocData;
