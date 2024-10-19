import { createBrowserRouter } from "react-router-dom";

// import components
import App from "../App.jsx";
import NotFound from "../Pages/NotFound.jsx";
import Home from "../Pages/Home.jsx";
import SigninSignUpLayout from "../Pages/SigninSignUpFromLayout.jsx";
import AuthForm from "../components/Forms/AuthenticateForm.jsx";
import ForgotPassword from "../components/Forms/ForgotPassword.jsx";
import ProtectedRoutes from "../components/auth/ProtectedRoutes.jsx";
import UserDashboard from "../components/Dashboard/UserDashboard.jsx";
import BoardOverview from "../components/Dashboard/BoardOverview.jsx";
import Search from "../components/Dashboard/Search.jsx";
import About from "../Pages/About.jsx";
import DashboardLayout from "../Pages/auth/DashboardLayout.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ProtectedRoutes />, // Authenticate user...
      },
      // public routes...
      {
        path:"about",
        element: <About />,
      },
      {
        path: "account",
        element: <SigninSignUpLayout />,
        children:[
          { 
            path:"signin",
            element:<AuthForm/>,
          },{
            path:"signup",
            element:<AuthForm/>
          },
          {
            path: "forgotPassword", // further implement a forgot pass page...
            element: <AuthForm />,
          },
          {
            path: "newPassword", // further implement a forgot pass page...
            element: <AuthForm />,
          },
          {
            path: "verify-email", // further implement a forgot pass page...
            element: <ForgotPassword />,
          }
        ]
      },
      // Protected Routes ...  
      { 
        element: <DashboardLayout />,
        children: [
          // layout content...
          {
            index:true,
            element: <UserDashboard />,
          },
          {
            path:"project/:projectName",
            element:<BoardOverview/>
          },
          {
            path: "notification",
            // element: <UserNotification />,
          },
          {
            path: "timeline",
            // element: <UserTimeline />,
          },
          {
            path: "setting",
            // element: <UserDashboardSetting />,
          },
          {
            path: "profile/:user",
            // element: <UserProfileCard />,
          },
        ],
      },
    ],
  }
]);