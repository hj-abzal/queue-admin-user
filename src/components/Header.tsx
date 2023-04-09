import React from 'react';
import {useNavigate} from "react-router-dom";
import ArrowIcon from '../assets/icons/arrow.svg'
import {useTranslation} from "react-i18next";

type HeaderPropsType = {
    title: string
    backButton?: boolean
    children?: React.ReactNode
}
export const Header: React.FC<HeaderPropsType> = ({title, backButton, children}) => {
    const navigate = useNavigate()
    const {t} = useTranslation()
    return (
        <div className="w-full h-[60px] bg-white flex items-center justify-center relative">
            {
                backButton && <div
                    className="absolute translate-x-0 -translate-y-2/4 left-2.5 top-2/4 flex items-center gap-x-2 text-[14px]"
                    onClick={() => navigate(-1)}>
                    <ArrowIcon/>
                    <span>{t("ORDERS.BACK")}</span>
                </div>
            }
            <div className="text-[#1C5279] basis-3/5 text-[16px] font-bold text-center">{title}</div>
            {
                children && <div className="absolute translate-x-2/4 -translate-y-2/4 left-[85%] top-2/4">
                    {children}
                </div>
            }
        </div>

    );
};

