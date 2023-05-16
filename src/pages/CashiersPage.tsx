import React from 'react';
import {Header} from "../components/Header";
import Trash from '../assets/icons/trash2.svg'
import {useTranslation} from "react-i18next";
import {ToggleSwitch} from "../components/ToggleSwitch";
import AddIcon from '.././assets/icons/plus-icon.svg'
import {NavLink, useNavigate, useParams} from "react-router-dom";
import ProfileIcon from "../assets/icons/profileIcon.svg";


export const CashiersPage = () => {
        const {restaurantId} = useParams()
        const cashiers = [
            {id: 1, name: 'Абзал', status: false, isConfirmed: false},
            {id: 2, name: 'Шокан', status: false, isConfirmed: true},
            {id: 3, name: 'Азиз', status: false, isConfirmed: false}
        ]
        const {t} = useTranslation()
        const navigate = useNavigate()
        return (
            <div className="h-full flex flex-col">
                <Header title={t('CASHIERS_PAGE.TITLE')}>
                    <NavLink to={`/home/restaurants/${restaurantId}/profile`}
                             className="flex flex-col items-center">
                        <ProfileIcon/>
                    </NavLink>
                </Header>
                <div className={"w-full flex flex-col bg-white mt-6 p-6 gap-y-12"}>
                    {cashiers.map(cashier => {
                        return (
                            <div
                                className={"h-[180px] flex justify-center flex-col bg-slate-300 gap-2  px-5 rounded-2xl shadow"}
                                onClick={() => {
                                    navigate(`${cashier.id}/edit`)
                                }}
                            >
                                <div className={'flex items-center justify-between'}>
                                    <div className={'flex flex-col mb-4 gap-y-1.5'}>
                                        <div className={'text-sm'}>{t('CASHIERS_PAGE.NAME')}</div>
                                        <div>{cashier.name}</div>

                                    </div>
                                    <div className={'flex flex-col mb-4 gap-y-0.5'}>
                                        <div className={'text-sm'}>{t("CASHIERS_PAGE.STATUS")}</div>
                                        <ToggleSwitch checked={false}/>
                                    </div>
                                    <div className={'flex flex-col mb-4 gap-y-1.5'}>
                                        <div className={'text-sm'}>{t("CASHIERS_PAGE.DELETE")}</div>
                                        <button className={'text-center'}><Trash/></button>

                                    </div>
                                </div>
                                {
                                    !cashier.isConfirmed &&
                                    (
                                        <div className={'flex text-error gap-x-2'}>
                                            <div className={'w-5 h-5 bg-error rounded-full'}></div>
                                            <div>{t('CASHIERS_PAGE.EMAIL')}</div>
                                        </div>
                                    )
                                }
                            </div>

                        )
                    })}
                    <div
                        className={"h-[70px] flex justify-center items-center flex-col bg-accent gap-2  px-5 rounded-2xl shadow"}
                    >
                        <div
                            className={'flex items-center justify-between'}
                            onClick={() => {
                                navigate('create')
                            }
                            }
                        >
                            <AddIcon/>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
;

