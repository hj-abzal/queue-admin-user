import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import './i18n'
import {Home} from "./pages/Home";
import {LoginPage} from "./pages/Main/LoginPage";
import {OrdersPage} from "./pages/OrdersPage"
import {useDispatch, useSelector} from "react-redux";
import {getOrdersTC} from "./store/reducers/orders-reducer";
import {OrderEditing} from "./components/OrderEditing";
import {Loader} from "./components/Loader";
import {AppStateType} from "./store/store";

export const App: React.FC = () => {

    const dispatch = useDispatch<any>()
    const loader = useSelector<AppStateType, boolean>(state => state.orders.loader)

    useEffect(() => {
        dispatch(getOrdersTC(45))
    }, [])

    return (
        <div>
            {loader && <Loader/>}
            <Routes>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/home'} element={<Home/>}>
                    <Route path={'/home/:restaurantId'} element={<OrdersPage/>}/>
                    <Route path={'/home/:restaurantId/orders/:orderId'} element={<OrderEditing/>}/>
                    <Route path={'/home/profile'} element={<div>coming soon</div>}/>
                </Route>
                <Route path={'/'} element={<Navigate to={'/login'}/>}/>
            </Routes>
        </div>
    )
};
