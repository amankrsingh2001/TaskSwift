import {Outlet, Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addCurrentUser } from '../../Slices/UserSlice';
import Home from '../../Pages/Home';
import DashboardLayout from '../../Pages/auth/DashboardLayout';

const ProtectedRoutes = () => {
    const user = useSelector(store => store.userInfo?.user);
    const [currentUser, setCurrentUser] = useState(user);
    const dispatch = useDispatch();

    useEffect(() => {
        // validation check...
    }, [currentUser])
    
    return ( currentUser ) ? <DashboardLayout/> : <Home/>

}

export default ProtectedRoutes;
