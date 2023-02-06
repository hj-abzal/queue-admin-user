import React from 'react';
import Lottie from "lottie-react";
import success from '../assets/animation/success.json';
import {useTranslation} from "react-i18next";
import {PaymentDetails} from "./PaymentDitails";

export const PaymentSuccess = () => {
    const {t} = useTranslation();

    const mockOrder = {
        order: '123456789',
        amount: '46 500 ₸',
        supplier: '89636376 Mtex management',
        comment: 'Комментарий'
    }

    return (
        <div>
            <div className="card">
                <div className="card-section items-center">
                    <Lottie className="h-[12.5rem] w-[21rem]" animationData={success} loop={false}/>
                    <span
                        className="text-center text-2xl leading-9 my-6 md:font-semibold md:text-[40px] md:leading-[48px]">{t("SUCCESS.TITLE")}</span>
                    <button className="btn w-full">{t("SUCCESS.BACK")}</button>
                </div>
                <PaymentDetails
                    className="card-section md:hidden"
                    order={mockOrder.order}
                    amount={mockOrder.amount}
                    supplier={mockOrder.supplier}
                    comment={mockOrder.comment}
                />
            </div>
            <PaymentDetails
                className="hidden  md:flex flex-col w-[375px] mt-8 m-auto px-5 pb-8"
                order={mockOrder.order}
                amount={mockOrder.amount}
                supplier={mockOrder.supplier}
                comment={mockOrder.comment}
            />
        </div>
    );
};
