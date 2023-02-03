import React from 'react';
import {PaymentData} from "./PaymentData";
import {PaymentForm} from "./PaymentForm";

export const Main = () => {

    return (
        <div className="flex w-full gap-7 w-[736px] shadow-[0_22px_47px_rgba(28,82,121,0.22)] mb-0 mx-auto px-7 py-6 rounded-2xl bg-white">
            <PaymentForm/>
            <PaymentData/>
        </div>
    );
};
