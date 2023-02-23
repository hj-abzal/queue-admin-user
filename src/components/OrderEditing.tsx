import React, {ChangeEvent, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {ordersAPI} from "../api/api";
import {useDispatch} from "react-redux";
import {Language} from "./Language";

export const OrderEditing: React.FC = () => {

    const {t} = useTranslation();
    const location = useLocation()
    const order = location.pathname.split('/')[4]
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    //useSelector order

    const {restaurantId, orderId} = useParams()

    useEffect(() => {
        if (restaurantId && orderId) {
            ordersAPI.getOrder(+restaurantId, +orderId).then(res => console.log(res))
        } else if (restaurantId) {
            // ordersAPI.createOrder(+restaurantId).then(res => console.log(res))
        }
    }, [])

    const backToMain = () => {
        navigate(-1)
    }

    const changeArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        console.log(e.currentTarget.value)
    }

    const isReadyClass = 'p-3 border-2 rounded-2xl bg-[white]'
    const buttonClass = 'btn h-8 p-5 flex items-center mt-10'

    return (
        <div>
            <div className={'flex w-full justify-around mt-6'}>
                <button className="rounded-lg bg-accent text-white disabled:opacity-40 pr-6 pl-6 p-1"
                        onClick={backToMain}>{t('ORDERS.BACK')}</button>
                <Language/>
            </div>
            <div className={'mt-10 flex flex-col items-center'}>
                <div className={'w-[250px] items-center flex flex-col'}>
                    <div
                        className={'font-bold text-xl mt-2'}>{order ? t('ORDERS_INFO.CHANGE') : t('ORDERS_CREATE.CREATE_PAGE')}</div>
                    <div className={'mt-8'}><textarea className={'p-3 rounded-2xl h-[80px] w-[250px] resize-none'}
                                                       placeholder={order ? '' : 'Добавьте новый заказ'}
                                                       value={order ? 'Кола бурегр фри' : ''} onChange={changeArea}/></div>
                    <main className={'flex w-full justify-evenly mt-9'}>
                        <div className={'flex items-center'}>{t('ORDERS_INFO.STATUS')}:</div>
                        <div
                            className={order ? `${isReadyClass} border-[#EF5630]` : `${isReadyClass} border-[gray]`}>{order ? t('ORDERS_INFO.NOT_READY') : t('ORDERS_CREATE.WAITING')}</div>
                    </main>
                    <div className={'font-bold mt-12 text-4xl'}>
                        A-447
                    </div>
                    <div
                        className={buttonClass}>{t('ORDERS_INFO.CHANGE')}
                    </div>
                </div>
            </div>
        </div>
    );
};
