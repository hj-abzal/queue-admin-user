import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {RestaurantType, UserType} from "../store/reducers/authReducer";
import {useTranslation} from "react-i18next";


export const ProfileInfo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const user = useSelector<AppStateType, any>(state => state.auth.user)
    const {t} = useTranslation()
    console.log(user);
    // const manager = user.roles.filter(el => el === 'restaurant')

    return (
        <div>
            <div className={'h-[40px] flex items-center justify-end w-full'}
                 onClick={() => navigate(-1)}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15 3C21.627 3 27 8.373 27 15C27 21.627 21.627 27 15 27C8.373 27 3 21.627 3 15C3 8.373 8.373 3 15 3ZM10.293 15.707L16.293 21.707C16.488 21.902 16.744 22 17 22C17.256 22 17.512 21.902 17.707 21.707C18.098 21.316 18.098 20.684 17.707 20.293L12.414 15L17.707 9.707C18.098 9.316 18.098 8.684 17.707 8.293C17.316 7.902 16.684 7.902 16.293 8.293L10.293 14.293C9.902 14.684 9.902 15.316 10.293 15.707Z"
                        fill="currentColor"/>
                </svg>
                Назад
            </div>
            <table className={'h-[250px]'}>
                <tr>
                    <th>{t('Имя пользователя:')}</th>
                    <td>{user.username}</td>
                </tr>
                <tr>
                    <th>{'Почта:'}</th>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <th>{'Роль:'}</th>
                    <td>{"Менеджер"}</td>
                </tr>
                <tr>
                    <th>{'Статус:'}</th>
                    <td>{user.status}</td>
                </tr>
            </table>
        </div>
    );
};

