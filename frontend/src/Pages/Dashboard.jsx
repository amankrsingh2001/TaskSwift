import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import Context from "../context/userContext";
import LeftSidebar from "../components/Dashboard/LeftSidebar";
import BoardOverview from "../components/Dashboard/BoardOverview";
import RightSidebar from "../components/Dashboard/RightSidebar";
const Dashboard = () => {
    const navigate = useNavigate();
    const { isLogedIn,setIsLogedIn } = useContext( Context )
    const signOutUser =  () => {
        navigate('/signin');
        setIsLogedIn();
    }

    console.log(isLogedIn)
    return (
        <section className="grid grid-cols-[minmax(80px,_260px)_minmax(400px,_1fr)_minmax(180px,_360px)] w-full h-screen">
            <LeftSidebar />
            <BoardOverview />
            <RightSidebar />
        </section>
    )
}

export default Dashboard;