import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {Navbar} from "../components/Navbar";
import {tokenTC} from "../store/reducers/authReducer";
import {useDispatch} from "react-redux";


export const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(tokenTC(token, navigate));
        } else {
            navigate('/login')
        }
    }, []);
    return (
        <div className={'flex flex-col h-full w-full'}>
            <Outlet/>
            <Navbar/>
        </div>
    );
};

