import React from 'react';
import {Button} from "../../components/Button";
import Lottie from "lottie-react";
import error from "../../assets/error.json";

export const PaymentError = () => {
    return (
        <div className="flex w-full gap-7 w-[736px] shadow-[0_22px_47px_rgba(28,82,121,0.22)] mb-0 mx-auto px-7 py-6 rounded-2xl bg-white">
            <div className="flex flex-col flex-1 items-center">
                <Lottie className="h-[282px] w-[178px]" animationData={error} />
                <Button className="w-full">Вернуться в магазин</Button>
            </div>
            <div className="flex flex-col flex-1 justify-center">
                <div className="font-bold text-[32px] leading-[38px] mb-2.5">Ошибка оплаты</div>
                <div className="font-medium text-base leading-6 max-w-[12.5rem]">Сумма снятия превышает установленный предел</div>
            </div>
        </div>
    );
};
