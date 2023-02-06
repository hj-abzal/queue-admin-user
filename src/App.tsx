import React from 'react';
import {Header} from "./components/Header";
import {Outlet} from "react-router-dom";
import './i18n'

export const App: React.FC = () => {
    return (
        <div className="w-full h-full">
            <Header/>
            <Outlet/>
        </div>
    )
};
