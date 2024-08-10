import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
    return (
        <>
        <p>Login to DashBoard</p>
        <button onClick={ () => toast.error("Sccess") } className="border-2">Alert! </button>
        </>
    )
}

export default Dashboard;