import { useReducer, useState } from "react";
import { Outlet, useLocation} from "react-router-dom";
import {motion} from 'framer-motion';
import "react-toastify/dist/ReactToastify.css";

import DashboardHeader from "../components/Header/DashboardHeader";
import NewTask from "../components/Forms/NewTask";
import NavigationMenuList from "../components/Dashboard/NavigationMenu";

const Dashboard = () => {
  const [showLeftSideBar, setShowLeftSidebar] = useReducer((old) => !old, false);
  const [newTaskFrom, setnewTaskFrom] = useReducer((old) => !old, false);
  const [sidebarWidth, setSidebarWidth] = useState(true)

  return (
    <section  className={`h-screen w-full bg-slate-50 text-black grid grid-cols-1 relative overflow-hidden ${sidebarWidth ? "md:grid-cols-[minmax(200px,_240px)_1fr] lg:grid-cols-[minmax(200px,_300px)_1fr]" : "md:grid-cols-[70px_1fr]"}`}>
        {/* <LeftSidebar sidebarToggle={showLeftSideBar} setSidebarWidth={setSidebarWidth} sidebarWidth={sidebarWidth} /> */}
        <NavigationMenuList sidebarToggle={showLeftSideBar} setSidebarWidth={setSidebarWidth} sidebarWidth={sidebarWidth} />
        
         {/*rightSidebarData ? "showTaskDetails": "hideTaskDetails" }  */}
      <main className={`bg-inherit overflow-hidden`}>
        <Outlet context={[ setnewTaskFrom ]}/>
      </main> 
      {newTaskFrom && (
        <NewTask newTaskFrom setnewTaskFrom={() => setnewTaskFrom()} />
      )}
    </section>
  );
};

export default Dashboard;