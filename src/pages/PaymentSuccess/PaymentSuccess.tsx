import React from 'react';
import {Button} from "../../components/Button";
import Lottie from "lottie-react";
import success from '../../assets/success.json';

export const PaymentSuccess = () => {

    return (
        <div className="flex w-full gap-7 w-[736px] shadow-[0_22px_47px_rgba(28,82,121,0.22)] mb-0 mx-auto px-7 py-6 rounded-2xl bg-white">
            <div className="flex flex-col flex-1 items-center">
                <Lottie className="h-[200px] w-[282]" animationData={success} />

                <span className="text-center  text-2xl leading-[38px] my-6">Операция завершена успешно</span>
                <Button className="w-full">Вернуться в магазин</Button>
            </div>
            <div className="flex flex-col flex-1">
                <div className="font-bold text-[32px] leading-[38px]">Детали операции</div>


                <div className="mt-2.5 mb-2 font-medium text-base leading-6">Заказ №</div>
                <span className="font-bold text-lg leading-6">89636376 Mtex management</span>

                <div className="mt-4 mb-2 font-medium text-base leading-6">Сумма заказа</div>
                <span className="font-bold text-lg leading-6">46 500 ₸</span>

                <div className="mt-4 mb-2 font-medium text-base leading-6">Поставщик</div>
                <span className="font-bold text-lg leading-6">ТОО “Горстройпромтехказгосторг”</span>

                <div className="mt-4 mb-2 font-medium text-base leading-6">Заказ</div>
                <span className="font-bold text-lg leading-6">Чайник Polaris PWK 1725CGLD WIFI</span>
            </div>
        </div>
    );
};
