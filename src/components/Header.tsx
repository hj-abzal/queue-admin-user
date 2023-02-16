import React from 'react';
import {useTranslation} from "react-i18next";
import {Language} from "./Language";

export const Header: React.FC = () => {

    const {t} = useTranslation();

    return (
        <div className={'flex justify-between mt-5 mr-8 ml-8'}>
            <Language/>
            <button className="rounded-lg bg-accent text-white disabled:opacity-40 pr-6 pl-6 p-1">{t('ORDERS.CREATE')}</button>
        </div>
    );
};