import React from 'react';
import {Header} from "../components/Header";
import {Outlet} from "react-router-dom";
import {Toaster} from "../components/Toaster";
import {useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {ToasterType} from "../store/reducers/toasterReducer";
import {Navbar} from "../components/Navbar";


export const Home: React.FC = () => {
    const toasterMessage = useSelector<AppStateType,string>(state => state.appReducer.toasterMessage)
    const toasterType = useSelector<AppStateType,ToasterType>(state => state.appReducer.toasterType)
    return (
        <div className={'flex flex-col h-full w-full'}>
            <Header/>
            <Outlet/>
            <Navbar/>
            <Toaster innerText={toasterMessage} type={toasterType}/>
        </div>
    );
};

