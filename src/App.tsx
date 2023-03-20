import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import './i18n'
import {Home} from "./pages/Home";
import {SingleCardPage} from "./components/SingleCardPage";
import {OrdersPage} from "./pages/OrdersPage"
import {useSelector} from "react-redux";
import {OrderEditing} from "./components/OrderEditing";
import {Loader} from "./components/Loader";
import {AppStateType} from "./store/store";
import {Restaurants} from "./pages/Restaurants";
import {LoginForm} from "./pages/LoginForm";
import {ProfilePage} from "./pages/ProfilePage";

export const App: React.FC = () => {
    const loader = useSelector<AppStateType, boolean>(state => state.auth.isLoading);
    return (
        <div className="w-screen h-screen">
            {loader && <Loader/>}
            <Routes>
                <Route path={'/login'} element={<SingleCardPage><LoginForm/></SingleCardPage>}/>
                <Route path={'/home'} element={<Home/>}>
                    <Route path={'/home/restaurants'} element={<Restaurants/>}/>
                    <Route path={'/home/restaurants/:restaurantId'} element={<OrdersPage/>}/>
                    <Route path={'/home/restaurants/:restaurantId/orders/:orderId'} element={<OrderEditing/>}/>
                    <Route path={'/home/profile'} element={<ProfilePage/>}/>
                </Route>
                <Route path={'/'} element={<Navigate to={'/login'}/>}/>
            </Routes>
        </div>
    )
};
