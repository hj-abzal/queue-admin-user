import {SingleCardPage} from "../components/SingleCardPage";
import {LoginForm} from "../pages/LoginForm";
import {Home} from "../pages/Home";
import {Restaurants} from "../pages/Restaurants";
import {USER_ROLES} from "../store/reducers/authReducer";
import {OrdersPage} from "../pages/OrdersPage";
import {Navigate} from "react-router-dom";
import React from "react";
import {CreateOrder} from "../pages/CreateOrder";
import {ChooseRestaurant} from "../HOC/ChooseRestaurant";
import {ProfilePage} from "../pages/ProfilePage";

export enum ROUTES {
    LOGIN = '/login',
    HOME = '/home',

    RESTAURANTS = '/home/restaurants',
    RESTAURANT_DETAILS = '/home/restaurants/:restaurantId/details',

    CASHIERS = '/home/restaurants/cashiers',
    CREATE_ORDER = '/home/restaurants/:restaurantId/orders/create',
    ORDERS = '/home/restaurants/:restaurantId/orders',

    PROFILE = '/home/restaurants/:restaurantId/profile',
}

export const routes = [
    {
        path: ROUTES.LOGIN,
        element: <SingleCardPage><LoginForm/></SingleCardPage>
    },
    {
        path: ROUTES.HOME,
        element: <Home/>,
        children: [
            {
                path: ROUTES.RESTAURANTS,
                element: <Restaurants/>,
                guards: [USER_ROLES.RESTAURANT]
            },
            {
                path: ROUTES.RESTAURANT_DETAILS,
                element: <div>restaurant id</div>,
                guards: [USER_ROLES.RESTAURANT]
            },
            {
                path: ROUTES.CASHIERS,
                element: <div>cashiers</div>,
                guards: [USER_ROLES.RESTAURANT]
            },
            {
                path: ROUTES.CREATE_ORDER,
                element: <ChooseRestaurant><CreateOrder/></ChooseRestaurant>,
                guards: [USER_ROLES.CASHIER]
            },
            {
                path: ROUTES.ORDERS,
                element: <ChooseRestaurant><OrdersPage/></ChooseRestaurant>,
                guards: [USER_ROLES.CASHIER]
            },
            {
                path: ROUTES.PROFILE,
                element: <ProfilePage/>,
                guards: [USER_ROLES.RESTAURANT, USER_ROLES.CASHIER]
            },
            {
                path: "*",
                element: <Navigate to={ROUTES.RESTAURANTS}/>,
            }
        ]
    },
    {
        path: '/',
        element: <Navigate to={'/login'}/>
    },
    {
        path: "*",
        element: <Navigate to={ROUTES.RESTAURANTS}/>,
    }
]


export const DEFAULT_ROLE_ROUTE: {
    [key in USER_ROLES]: ROUTES
} = {
    [USER_ROLES.RESTAURANT]: ROUTES.RESTAURANTS,
    [USER_ROLES.CASHIER]: ROUTES.ORDERS,
    [USER_ROLES.USER]: ROUTES.LOGIN,
    [USER_ROLES.ADMIN]: ROUTES.LOGIN,
}
