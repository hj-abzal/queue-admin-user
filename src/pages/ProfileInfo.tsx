import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {useTranslation} from "react-i18next";
import {Language} from "../components/Language";


export const ProfileInfo = () => {
    const user = useSelector<AppStateType, any>(state => state.auth.user)
    const {t} = useTranslation()

    const userRole = user.roles?.filter((el: string) => el === 'restaurant' || el === "cashier")
        .join() === 'restaurant'
        ? t('PROFILE.USER_ROLE_MANAGER')
        : t('PROFILE.USER_ROLE_CASHIER')

    return (
        <div>
            <table className={'h-[250px]'}>
                <tbody>
                <tr>
                    <th className={'pr-[20px]'}>{t('PROFILE.USER_NAME') + ':'}</th>
                    <td>{user.username}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th className={'pr-[20px]'}>{t('LOGIN_FORM.EMAIL') + ':'}</th>
                    <td>{user.email}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th className={'pr-[20px]'}>{t('PROFILE.USER_ROLE') + ':'}</th>
                    <td>
                        {userRole}
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th className={'pr-[20px]'}>{t('PROFILE.PROFILE_STATUS') + ':'}</th>
                    <td>
                        {
                            user.status === "active"
                                ? t('PROFILE.PROFILE_STATUS_VERIFIED')
                                : t('PROFILE.PROFILE_STATUS_UNVERIFIED')
                        }
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th className={'pr-[20px]'}>{t('PROFILE.LANGUAGE') + ':'}</th>
                    <td><Language/></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

