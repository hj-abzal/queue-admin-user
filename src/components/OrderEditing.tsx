import React, {ChangeEvent, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedOrderTC, OrderType} from "../store/reducers/orders-reducer";
import {AppStateType} from "../store/store";

export const OrderEditing: React.FC = () => {

    const {t} = useTranslation();
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const {restaurantId, orderId} = useParams()
    const order = useSelector<AppStateType, OrderType | null>(state => state.orders.selectedOrder)
    const [comment, setComment] = React.useState<string>('')

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

    const backToMain = () => {
        navigate(-1)
    }

    const changeArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value)
    }

    const isReadyClass = 'p-3 border-2 rounded-2xl bg-[white]'
    const buttonClass = 'btn h-8 p-5 flex items-center mt-10'

    return (
        <div>
            <div className={'flex w-full justify-around mt-6'}>
                <button className="rounded-lg bg-accent text-white disabled:opacity-40 pr-6 pl-6 p-1"
                        onClick={backToMain}>{t('ORDERS.BACK')}</button>
            </div>
            <div className={'mt-10 flex flex-col items-center'}>
                <div className={'w-[250px] items-center flex flex-col'}>
                    <div
                        className={'font-bold text-xl mt-2'}>{t('ORDERS_INFO.CHANGE')}</div>
                    <div className={'mt-8'}><textarea className={'p-3 rounded-2xl h-[80px] w-[250px] resize-none'}
                                                      value={comment} onChange={changeArea}/>
                    </div>
                    <main className={'flex w-full justify-evenly mt-9'}>
                        <div className={'flex items-center'}>{t('ORDERS_INFO.STATUS')}:</div>
                        <div
                            className={order?.is_ready ? `${isReadyClass} border-[#EF5630]` : `${isReadyClass} border-[gray]`}>{order ? t('ORDERS_INFO.NOT_READY') : t('ORDERS_CREATE.WAITING')}</div>
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
