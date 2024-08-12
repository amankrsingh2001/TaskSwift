import { useContext } from 'react';
import {Outlet, Navigate} from 'react-router-dom'
import Context from '../../context/userContext';

const ProtectedRoutes = () => {
    // cookie validation... 
    const { isLogedIn  } = useContext( Context )
    console.log(isLogedIn)
    return isLogedIn ? <Outlet/> : <Navigate to='/signin'/>

}

export default ProtectedRoutes;