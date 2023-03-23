import React from 'react';
import {ProfileInfo} from "./ProfileInfo";
import {SingleCardPage} from "../components/SingleCardPage";
import {Header} from "../components/Header";
import Logout from '../assets/icons/logout.svg'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLogged} from "../store/reducers/authReducer";

export const ProfilePage = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token')
        dispatch(setLogged(false))
        navigate('/login');
    }

    return (
        <div className="h-full flex flex-col">
            <Header title={'Профиль'} backButton>
                <div onClick={logout}>
                    <Logout/>
                </div>
            </Header>
            <div className={'flex-grow flex items-center justify-center'}>
                <SingleCardPage><ProfileInfo/></SingleCardPage>
            </div>
        </div>
    );
};

