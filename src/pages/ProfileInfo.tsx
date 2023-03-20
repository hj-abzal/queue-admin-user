import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {useTranslation} from "react-i18next";


export const ProfileInfo = () => {
    const user = useSelector<AppStateType, any>(state => state.auth.user)
    const {t} = useTranslation()

    return (
        <div>
            <table className={'h-[250px]'}>
                <tbody>
                <tr>
                    <th className={'pr-[20px]'}>{t('Имя пользователя:')}</th>
                    <td>{user.username}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th className={'pr-[20px]'}>{'Почта:'}</th>
                    <td>{user.email}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th className={'pr-[20px]'}>{'Роль:'}</th>
                    <td>{"Менеджер"}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th className={'pr-[20px]'}>{'Статус:'}</th>
                    <td>{user.status}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

