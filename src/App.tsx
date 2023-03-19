import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import './i18n'
import {Home} from "./pages/Home";
import {LoginPage} from "./pages/Main/LoginPage";
import {OrdersPage} from "./pages/OrdersPage"
import {useSelector} from "react-redux";
import {OrderEditing} from "./components/OrderEditing";
import {Loader} from "./components/Loader";
import {AppStateType} from "./store/store";
import {Restaurants} from "./pages/Restaurants";

export const App: React.FC = () => {
    const loader = useSelector<AppStateType, boolean>(state => state.orders.loader);

    return (
        <div className="w-screen h-screen">
            {loader && <Loader/>}
            <Routes>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/home'} element={<Home/>}>
                    <Route path={'/home/restaurants'} element={<Restaurants/>}/>
                    <Route path={'/home/restaurants/:restaurantId'} element={<OrdersPage/>}/>
                    <Route path={'/home/restaurants/:restaurantId/orders/:orderId'} element={<OrderEditing/>}/>
                    <Route path={'/home/profile'} element={<div>coming soon</div>}/>
                </Route>
                <Route path={'/'} element={<Navigate to={'/login'}/>}/>
            </Routes>
        </div>
    )
};
