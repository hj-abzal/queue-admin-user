import React from 'react';
import {VisaIcon} from "../../components/Visa";
import {MastercardIcon} from "../../components/MastercardIcon";

export const PaymentData: React.FC = () => {
    return (
        <div className="flex flex-col flex-1">
            <div className="flex-1">
                <span className="font-medium text-base leading-6">Оплата</span>
                <h1 className="font-bold text-[40px] leading-[52px]">46 500 ₸</h1>
                <span className="font-medium text-base leading-6">89636376 Mtex management</span>
            </div>
            <div className="flex gap-3.5 justify-end">
                <VisaIcon/>
                <MastercardIcon/>
            </div>
        </div>
    );
};

