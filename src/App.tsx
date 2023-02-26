import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import './i18n'
import {Home} from "./pages/Home";
import {LoginPage} from "./pages/Main/LoginPage";
import {OrdersPage} from "./pages/OrdersPage";
import {PaymentError} from "./pages/PaymentError";
import {useDispatch} from "react-redux";
import {getOrdersTC} from "./store/reducers/orders-reducer";

export const App: React.FC = () => {

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(getOrdersTC(96))
    }, [])

    return (
        <div>
            <Routes>
                <Route path={'/login'} element={<LoginPage/>}/>

                <Route path={'/home'} element={<Home/>}>
                    <Route path={'/home/orders'} element={<OrdersPage/>}/>
                    <Route path={'/home/profile'} element={<PaymentError/>}/>
                </Route>

                <Route path={'/'} element={<Navigate to={'/login'}/>}/>
                <Route path={'*'} element={<Navigate to={'/login'}/>}/>
            </Routes>
        </div>
    )
};
