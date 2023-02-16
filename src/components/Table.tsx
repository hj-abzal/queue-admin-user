import React from 'react';
import {OrdersInitStateType} from "../store/reducers/orders-reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {useTranslation} from "react-i18next";


type TableProps = {
    isDone: boolean
}

export const Table = (props: TableProps) => {

    const {t} = useTranslation();
    const orders = useSelector<AppStateType, OrdersInitStateType>(state => state.orders)
    const mainClass = 'flex text-center font-medium justify-center text-[white] overflow-y-scroll p-2.5 rounded-[20px_20px_0_0] border-[none]'
    const borderClass = 'flex flex-row border w-80 justify-evenly flex-wrap overflow-y-scroll rounded-[0_0_8px_8px] border-solid border-2 p-1'
    const ordersClass = 'h-20 font-bold p-2 min-w-[80px] text-[20px] bg-white flex justify-center items-center shadow-[0_2px_5px_0_rgba(0,0,0,0.4)]  m-[5px] px-[5px] rounded-[10px] border-2 border-[solid]'

    return (
        <div className={'flex justify-center basis-[68%] ml-2 mb-28 mt-16'}>
            <div className={'flex flex-col'}>
                <div>
                    <div
                        className={props.isDone ? `${mainClass} bg-[green]` : `${mainClass} bg-accent`}>{props.isDone ? t('ORDERS.DONE') : t('ORDERS.NOT_READY')}</div>
                    <div
                        className={props.isDone ? `${borderClass} border-[green]` : `${borderClass} border-[#fe540e]`}>
                        {orders.orders.map((t) => {
                            if (t.is_ready === props.isDone) return <button key={t.id}
                            className={props.isDone ? `${ordersClass} border-[green]` : `${ordersClass} border-[#fe540e]`}>{t.key}</button>})}</div>
                </div>
            </div>
        </div>
    );
};
