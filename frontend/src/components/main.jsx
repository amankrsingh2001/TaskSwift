import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import components
import "../styles/index.css";
import NotFound from "../Pages/NotFound.jsx";
import Signin from "./Forms/Signin.jsx";
import Dashboard from "../Pages/Dashboard.jsx";
import Home from "../Pages/Home.jsx";
import ForgotPassword from "./Forms/ForgotPassword.jsx";
import Signin_SignUp from "../Pages/Signin_Signup.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import { UserContext } from "../context/userContext.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signin",
        element: <Signin_SignUp />,
      },
      {
        path: "signup",
        element: <Signin_SignUp />,
      },
      {
        path: "forgot-password", // further implement a forgot pass page...
        element: <ForgotPassword />,
      },
      {
        path: "verify-email",
        element: <Signin />,
      },
      {
        element:<ProtectedRoutes/>,
        children:[
          
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ]
      }
     
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <UserContext>
      <RouterProvider router={router}>
          <App />
      </RouterProvider>
      </UserContext>
  </React.StrictMode>
);
