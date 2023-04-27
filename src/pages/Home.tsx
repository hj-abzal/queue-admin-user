import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {Navbar} from "../components/Navbar";
import {tokenTC, USER_ROLES, UserType} from "../store/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {AppStateType} from "../store/store";


export const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const {t} = useTranslation()
    const user = useSelector<AppStateType, UserType>((state) => state.auth.user);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(tokenTC(token, navigate, t));
        } else {
            navigate('/login')
        }
    }, []);


    if (user.roles?.length === 0) return <></>;
    const role = user?.roles?.filter(r => r !== USER_ROLES.USER)[0];
    return (
        <div className='h-[calc(100%_-_88px)] flex flex-col overflow-y-auto'>
            <div className="flex-grow">
                <Outlet/>
            </div>
            <div className="w-screen absolute left-0 bottom-0">
                <Navbar role={role}/>
            </div>
        </div>
    );
};

