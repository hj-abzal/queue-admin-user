import React from 'react';
import {PaymentForm} from "./PaymentForm";
import {VisaIcon} from "../../components/Visa";
import {MastercardIcon} from "../../components/MastercardIcon";
import {useTranslation} from "react-i18next";

export const Main = () => {
    const {t} = useTranslation();
    return (
        <div>
            <div className="hidden md:flex flex-col items-center mb-3">
                <span className="font-medium text-base leading-6">{t("PAYMENT_FORM.TITLE")}</span>
                <h1 className="font-bold text-5xl leading-[3.25rem] mt-2">46 500 ₸</h1>
                <span className="font-medium text-base leading-6">89636376 Mtex management</span>
            </div>

            <div className="card">
                <PaymentForm/>
                <div className="card-section md:hidden">
                    <div className="flex-1">
                        <span className="font-medium text-base leading-6">{t("PAYMENT_FORM.TITLE")}</span>
                        <h1 className="font-bold text-[2.5rem] leading-[3.25rem]">46 500 ₸</h1>
                        <span className="font-medium text-base leading-6">89636376 Mtex management</span>
                    </div>
                    <div className="flex gap-3.5 justify-end">
                        <VisaIcon/>
                        <MastercardIcon/>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex justify-center gap-3 mt-6">
                <VisaIcon/>
                <MastercardIcon/>
            </div>
        </div>
    );
};
