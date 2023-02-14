import React from 'react';
import {Header} from "../components/Header";
import {Outlet} from "react-router-dom";
import {Toaster} from "../components/Toaster";
import {useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {ToasterType} from "../store/reducers/toasterReducer";

export const Home = () => {
    const toasterMessage = useSelector<AppStateType,string>(state => state.appReducer.toasterMessage)
    const toasterType = useSelector<AppStateType,ToasterType>(state => state.appReducer.toasterType)
    return (
        <div className="w-full flex flex-col justify-between items-center h-screen">
            <Header/>
            <Outlet/>
            <Toaster innerText={toasterMessage} type={toasterType}/>
        </div>
    );
};

