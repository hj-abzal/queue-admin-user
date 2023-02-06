import React from 'react';
import Lottie from "lottie-react";
import error from "../assets/animation/error.json";
import {useTranslation} from "react-i18next";

export const PaymentError = () => {
    const {t} = useTranslation();
    const mockError = {
        text: 'Сумма снятия превышает установленный предел',
    }

    return (
        <div className="card">
            <div className="card-section items-center">
                <Lottie className="w-[23rem] h-[13rem]" animationData={error} loop={false}/>
                <button className="md:hidden btn w-full">{t("ERROR.RETRY")}</button>

            </div>
            <div className="card-section justify-center md:items-center">
                <div className="font-bold text-[2rem] leading-9 mb-2.5 md:font-semibold md:text-[2.5rem] md:leading-12 md:text-center">{t("ERROR.TITLE")}</div>
                <div className="font-medium text-base leading-6 max-w-[12.5rem] md:w-full md:text-center">{mockError.text}</div>
                <button className="btn w-full mt-16 hidden md:block">{t("ERROR.RETRY")}</button>
            </div>
        </div>
    );
};
