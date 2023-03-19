import React, {useEffect} from 'react';
import {Table} from "../components/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {getOrdersTC, OrdersInitStateType} from "../store/reducers/orders-reducer";
import {useTranslation} from "react-i18next";
import {AddItemForm} from "../components/AddItemForm";
import {useParams} from "react-router-dom";

export const OrdersPage: React.FC = () => {
    const dispatch = useDispatch<any>();
    const {restaurantId} = useParams()
    const {t} = useTranslation();
    const orders = useSelector<AppStateType, OrdersInitStateType>(state => state.orders)

    const readyOrders = orders.orders.filter(order => order.is_ready)
    const notReady = orders.orders.filter(order => !order.is_ready)
    useEffect(() => {
        dispatch(getOrdersTC(Number(restaurantId)))
    }, [])

    return (
        <div>
            <AddItemForm/>
            <Table orders={notReady} variant={'primary'} title={t('ORDERS.NOT_READY')}/>
            <Table orders={readyOrders} variant={'secondary'} title={t('ORDERS.DONE')}/>
        </div>
    );
};
