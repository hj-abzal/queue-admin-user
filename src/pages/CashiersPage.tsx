import React from 'react';
import {Header} from "../components/Header";
import Trash from '../assets/icons/trash2.svg'
import {useTranslation} from "react-i18next";
import {ToggleSwitch} from "../components/ToggleSwitch";

export const CashiersPage = () => {
        const cashiers = [
            {name: 'Абзал', status: false, isConfirmed: false},
            {name: 'Шокан', status: false, isConfirmed: true},
            {name: 'Азиз', status: false, isConfirmed: false}
        ]
        const {t} = useTranslation()

        return (
            <div className="h-full flex flex-col">
                <Header title={t('CASHIERS_PAGE.TITLE')}/>
                <div className={"w-full flex flex-col bg-white mt-6 p-6 gap-y-12"}>
                    {cashiers.map(cashier => {
                        return (
                            <div
                                className={"h-[180px] flex justify-center flex-col bg-slate-300 gap-2  px-5 rounded-2xl shadow"}
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
                </div>

            </div>
        );
    }
;

