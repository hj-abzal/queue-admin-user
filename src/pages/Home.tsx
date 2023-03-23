import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {Navbar} from "../components/Navbar";
import {tokenTC} from "../store/reducers/authReducer";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";


export const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const {t} = useTranslation()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(tokenTC(token, navigate, t));
        } else {
            navigate('/login')
        }
    }, []);
    return (
        <div className='h-[calc(100%_-_88px)] flex flex-col overflow-y-auto'>
            <div className="flex-grow">
                <Outlet/>
            </div>
            <div className="w-screen absolute left-0 bottom-0">
                <Navbar/>
            </div>
        </div>
    );
};

