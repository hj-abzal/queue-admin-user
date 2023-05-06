import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {useTranslation} from "react-i18next";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {getOrdersTC, OrdersInitStateType} from "../store/reducers/ordersReducer";
import {Table} from "../components/Table";
import {Header} from "../components/Header";
import ProfileIcon from '../assets/icons/profileIcon.svg'

export const OrdersPage: React.FC = () => {
    const {restaurantId} = useParams()
    const {t} = useTranslation();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const orders = useSelector<AppStateType, OrdersInitStateType>(state => state.orders)
    const readyOrders = orders.orders.filter(order => order.is_ready)
    const notReady = orders.orders.filter(order => !order.is_ready)

    useEffect(() => {
        dispatch(getOrdersTC(Number(restaurantId)))
    }, [])

    const onClickOrder = (id: number) => {
        navigate(`/home/restaurants/${restaurantId}/orders/${id}`)
    }
    const profileRoute = `/home/restaurants/${restaurantId}/profile`
    return (
        <div className="h-full flex flex-col">
            <Header title={t('NAVBAR.ORDERS')}>
                <NavLink to={profileRoute} className="flex flex-col items-center w-full h-full">
                    <ProfileIcon/>
                </NavLink>
            </Header>
            <div className="flex-grow flex flex-col gap-4 justify-center overflow-y-auto">
                <Table
                    orders={notReady}
                    variant={'primary'}
                    title={t('ORDERS.NOT_READY')}
                    onItemClicked={onClickOrder}
                />
                <Table
                    orders={readyOrders}
                    variant={'secondary'}
                    title={t('ORDERS.DONE')}
                    onItemClicked={onClickOrder}
                />
            </div>
        </div>
    );
};
