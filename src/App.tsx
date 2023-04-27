import React from 'react';
import {Route, Routes} from "react-router-dom";
import './i18n'
import {useSelector} from "react-redux";
import {Loader} from "./components/Loader";
import {AppStateType} from "./store/store";
import {RolesGuard} from "./Routes/HOC/RolesWrapper";
import {routes} from "./Routes/Routes";


export const App: React.FC = () => {
    const loader = useSelector<AppStateType, boolean>(state => state.auth.isLoading);
    return (
        <div className="w-screen h-screen relative">
            {loader && <Loader/>}
            <Routes>
                {
                    routes.map((route, index) => {
                        return (
                            <Route key={index} path={route.path} element={route.element}>
                                {route.children?.length && route.children.map((child, index) => {
                                    return (
                                        <Route key={index} path={child.path} element={
                                            <RolesGuard roles={child.guards || []}>{child.element}</RolesGuard>
                                        }/>
                                    )
                                })}
                            </Route>
                        )
                    })
                }
            </Routes>
        </div>
    )
};
