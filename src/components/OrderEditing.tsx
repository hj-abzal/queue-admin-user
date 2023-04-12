import React, {ChangeEvent, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {deleteOrderTC, getSelectedOrderTC, OrderType, updateOrderTC} from "../store/reducers/ordersReducer";
import {Header} from "./Header";
import ReactDOM from "react-dom";
import {Modal} from "./Modal";
import QRCode from "react-qr-code";
import Trash from '../assets/icons/trash.svg'
import QRIcon from '../assets/icons/qr.svg'
import classNames from "classnames";


export const OrderEditing: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const {restaurantId, orderId} = useParams()
    const order = useSelector<AppStateType, OrderType | null>(state => state.orders.selectedOrder)
    const [comment, setComment] = React.useState<string>('')
    const [isBtnShowed, setIsBtnShowed] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isQR, setIsQR] = useState<boolean>(false)
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
        setIsBtnShowed(false)
    }
    const modalHandler = (isQR: boolean, value: boolean) => {
        if (isQR) {
            setIsQR(true)
        } else {
            setIsQR(false)
        }
        setIsModalOpen(value)
    }
    const onDeleteHandler = () => {
        navigate(-1)
        dispatch(deleteOrderTC(Number(restaurantId), Number(orderId), t))
    }
    const onCancelChangesHandler = () => {
        dispatch(getSelectedOrderTC(restaurantId!, orderId!))
        setIsBtnShowed(false)
    }
    const buttonClass = isBtnShowed ? 'rounded-lg bg-accent text-white p-1 disabled:opacity-40' : 'hidden'
    return (
        <div className={"h-full flex flex-col"}>
            <Header title={t('ORDERS_INFO.CHANGE')} backButton>
                <div onClick={() => {
                    modalHandler(false, true)
                }}><Trash/></div>
            </Header>
            <div
                className={'h-full flex flex-col items-center mt-5 px-4'}>
                <div
                    className={'w-[250px] flex justify-between text-lg'}>
                    <div>{`${t('ORDERS_INFO.STATUS')}:`}</div>
                    <div
                        className={classNames('', {
                            'text-accent': !order?.is_ready,
                            'text-[green]': order?.is_ready
                        })}>{order?.is_ready ? t('ORDERS_INFO.DONE') : t('ORDERS_INFO.NOT_READY')}</div>
                </div>
                <div className={'mt-5'}>
                    <div className={'flex w-full justify-between'}>
                        <button
                            className={`${buttonClass} w-24`}
                            onClick={() => {
                                onChangeOrderInfo(Number(restaurantId), Number(orderId), order!.is_ready, comment)
                            }}>{t('ORDERS_INFO.SAVE')}
                        </button>
                        <button
                            className={`${buttonClass} w-20 bg-error text-sm`}
                            onClick={
                                onCancelChangesHandler
                            }>{t('ORDERS_INFO.CANCEL')}
                        </button>
                    </div>
                </div>

                <div className={'font-bold mt-12 text-4xl'}>
                    {order?.key}
                </div>
                <div className={'w-[250px] flex mt-9 justify-between'}>
                    <button
                        className={'min-w-[150px] rounded-lg bg-accent mt-12 mb-6 text-white h-16 text-lg px-4' + (order?.is_ready ? ' bg-accent px-4' : ' bg-[green] px-7')}
                        onClick={() => {
                            onChangeOrderInfo(Number(restaurantId), Number(orderId), !order?.is_ready, comment)
                        }}
                    >
                        {order?.is_ready ? t('ORDERS_INFO.NOT_READY') : t('ORDERS_INFO.DONE')}
                    </button>
                    <button
                        className={'rounded-lg bg-[#1C5279] mt-12 mb-6 text-white h-16 text-lg px-4'}
                        onClick={() => {
                            modalHandler(true, true)
                        }}>
                        <QRIcon/>
                    </button>
                </div>

            </div>
            {
                isModalOpen &&
                ReactDOM.createPortal(<Modal>
                    {isQR &&
                        <>
                            <div className={'flex w-full justify-end mb-4 gap-x-7'}>
                                <h2 className="text-lg font-bold">{t('ORDERS_INFO.MODAL.QR')}</h2>
                                <button
                                    className={'rounded-full bg-error text-white p-1 w-9'}
                                    onClick={() => {
                                        setIsModalOpen(false)
                                    }}
                                >X
                                </button>
                            </div>
                            <QRCode value={`https://kezek.online/#/restaurants/${restaurantId}/orders/${orderId}`}/>
                        </>

                    }
                    {!isQR &&
                        <div>
                            <div className={'font-bold'}>{t("ORDERS_INFO.MODAL.DELETING")}</div>
                            <div className={'flex w-full justify-evenly'}>
                                <button
                                    className={'rounded-lg bg-error mt-8 mb-6 text-white disabled:opacity-40 pr-6 pl-6 p-1'}
                                    onClick={onDeleteHandler}
                                >{t('ORDERS_INFO.DELETE')}</button>
                                <button
                                    className={'rounded-lg bg-accent mt-8 mb-6 text-white disabled:opacity-40 pr-6 pl-6 p-1'}
                                    onClick={() => {
                                        modalHandler(false, false)
                                    }}
                                >{t('ORDERS_INFO.MODAL.NO')}</button>
                            </div>
                        </div>
                    }

                </Modal>, document.getElementById('portal')!)}
        </div>
    );
};
