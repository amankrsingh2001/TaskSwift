import { createBrowserRouter } from "react-router-dom";

// import components
import App from "../components/App.jsx";
import NotFound from "../Pages/NotFound.jsx";
import Home from "../Pages/Home.jsx";
import SigninSignUpPage from "../Pages/SigninSignUpPage.jsx";
import Signin from "../components/Forms/Signin.jsx";
import Signup from "../components/Forms/SignUp.jsx";
import ForgotPassword from "../components/Forms/ForgotPassword.jsx";
import ProtectedRoutes from "../components/utils/ProtectedRoutes.jsx";
import Dashboard from "../Pages/Dashboard.jsx";
import UserDashboard from "../components/Dashboard/UserDashboard.jsx";
import BoardOverview from "../components/Dashboard/BoardOverview.jsx";
import Search from "../components/Dashboard/Search.jsx";
import RegisterUser from "../components/Forms/RegisterUser.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <SigninSignUpPage />,
        children:[
          { 
            path:"signin",
            element:<Signin/>,
          },{
            path:"signup",
            element:<RegisterUser/>
          },
          {
            path: "forgot-password", // further implement a forgot pass page...
            element: <ForgotPassword />,
          }
        ]
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: ":user",
            element: <Dashboard />,
            children: [
              {
                index: true,
                element: <UserDashboard />,
              },
              {
                  path:":projectName",
                  element:<BoardOverview/>
              },
              {
                path: "notification",
                element: <Search />,
              },
              {
                path: "timeline",
                element: <UserDashboard />,
              },
            ],
          },
        ],
      },
      {
        path:"*",
        element:<NotFound/>
      }
    ],
  }
]);
