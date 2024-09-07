import {Outlet, Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addCurrentUser } from '../../store/Slices/UserSlice';

const ProtectedRoutes = () => {
    const user = useSelector(store => store.userInfo?.user);
    const [currentUser, setCurrentUser] = useState(user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Get request for current user...
        // update store
        // dispatch(addCurrentUser(currentUser));
    }, [currentUser])
    
    return ( currentUser ) ? <Outlet/> : <Navigate to='/signin'/>

}

export default ProtectedRoutes;