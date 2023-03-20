import React, {ChangeEvent, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {getSelectedOrderTC, OrderType, updateOrderTC} from "../store/reducers/ordersReducer";
import {Header} from "./Header";

export const OrderEditing: React.FC = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch<any>()
    const {restaurantId, orderId} = useParams()
    const order = useSelector<AppStateType, OrderType | null>(state => state.orders.selectedOrder)
    const [comment, setComment] = React.useState<string>('')
    const [isBtnShowed, setIsBtnShowed] = useState<boolean>(false)
    useEffect(() => {
        if (restaurantId && orderId) {
            dispatch(getSelectedOrderTC(restaurantId, orderId))
        }
    }, [])

    useEffect(() => {
        if (order) {
            setComment(order.description)
        }
    }, [order])


    const changeArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value)
        setIsBtnShowed(true)
    }
    const onChangeOrderInfo = (restaurantId: number, orderId: number, is_ready: boolean, description: string) => {
        dispatch(updateOrderTC(restaurantId, orderId, is_ready, description))
    }


    const buttonClass = isBtnShowed ? 'rounded-lg bg-accent text-white disabled:opacity-40 pr-6 pl-6 p-1' : 'hidden'
    return (
        <div>
            <Header title={t('ORDERS_INFO.CHANGE')} backButton/>
            <div className={'flex flex-col items-center'}>
                <div className={'w-[250px] items-center flex flex-col'}>
                    <div className={'mt-8'}>
                        <textarea className={'p-3 rounded-2xl h-[80px] w-[250px] resize-none'}
                                  value={comment} onChange={changeArea}/>
                        <button className={buttonClass} onClick={() => {
                            onChangeOrderInfo(Number(restaurantId), Number(orderId), order!.is_ready, comment)
                        }}>Сохранить
                        </button>
                    </div>
                    <main className={'flex w-full justify-evenly mt-9'}>
                        <label htmlFor="Toggle3"
                               className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800">
                            <input id="Toggle3" type="checkbox" className="hidden peer"
                                   checked={order?.is_ready}
                                   onChange={() => {
                                       onChangeOrderInfo(Number(restaurantId), Number(orderId), !order!.is_ready, comment)
                                   }}
                            />
                            <span
                                className="px-4 py-2 rounded-l-md dark:bg-accent text-white peer-checked:text-black peer-checked:dark:bg-gray-300">{t('ORDERS_INFO.NOT_READY')}</span>
                            <span
                                className="px-4 py-2 rounded-r-md dark:bg-gray-300 peer-checked:dark:bg-accent peer-checked:text-white">{t('ORDERS_CREATE.WAITING')}</span>
                        </label>
                    </main>
                    <div className={'font-bold mt-12 text-4xl'}>
                        {order?.key}
                    </div>
                    <button className={'rounded-lg bg-accent mt-12 mb-6 text-white disabled:opacity-40 pr-6 pl-6 p-1'}>
                        Удалить
                    </button>
                    <button className={'rounded-lg bg-accent h-24 w-48 text-white disabled:opacity-40 pr-6 pl-6 p-1'}>
                        Показать QR
                    </button>
                </div>
            </div>
        </div>
    );
};
