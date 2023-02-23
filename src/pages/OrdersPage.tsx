import React from 'react';
import {Table} from "../components/Table";
import {useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {OrdersInitStateType} from "../store/reducers/orders-reducer";
import {useTranslation} from "react-i18next";
import {AddItemForm} from "../components/AddItemForm";

export const OrdersPage: React.FC = () => {

    const {t} = useTranslation();
    const orders = useSelector<AppStateType, OrdersInitStateType>(state => state.orders)

    const readyOrders = orders.orders.filter(order => order.is_ready)
    const notReady = orders.orders.filter(order => !order.is_ready)

    return (
        <div>
            <AddItemForm/>
            <Table orders={notReady} variant={'primary'} title={t('ORDERS.NOT_READY')}/>
            <Table orders={readyOrders} variant={'secondary'} title={t('ORDERS.DONE')}/>
        </div>
    );
};
