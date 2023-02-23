import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {Navbar} from "../components/Navbar";


export const Home: React.FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')!
        if (!token) {
            navigate('/login')
        }
    }, [])
    return (
        <div className={'flex flex-col h-full w-full'}>
            <Outlet/>
            <Navbar/>
        </div>
    );
};

