import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import './i18n'
import {Home} from "./pages/Home";
import {LoginPage} from "./pages/Main/LoginPage";
import {PaymentSuccess} from "./pages/PaymentSuccess";
import {PaymentError} from "./pages/PaymentError";

export const App: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path={'/login'} element={<LoginPage/>}/>

                <Route path={'/home'} element={<Home/>}>
                    <Route path={'/home/orders'} element={<PaymentSuccess/>}/>
                    <Route path={'/home/profile'} element={<PaymentError/>}/>
                </Route>
                <Route path={'/'} element={<Navigate to={'/home/login'}/>}/>
            </Routes>
        </div>
    )
};
