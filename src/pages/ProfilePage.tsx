import React from 'react';
import {ProfileInfo} from "./ProfileInfo";
import {SingleCardPage} from "../components/SingleCardPage";
import {Header} from "../components/Header";
import Logout from '../assets/icons/logout.svg'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLogged, setRestaurantSelected} from "../store/reducers/authReducer";
import {useTranslation} from "react-i18next";

export const ProfilePage = () => {
    const dispatch = useDispatch<any>();
    const {t} = useTranslation()
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('restaurantId')
        dispatch(setLogged(false))
        dispatch(setRestaurantSelected(false))
        navigate('/login');
    }

    return (
        <div className="h-full flex flex-col">
            <Header title={t('NAVBAR.PROFILE')} backButton>
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

