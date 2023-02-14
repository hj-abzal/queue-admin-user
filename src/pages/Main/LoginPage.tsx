import React from 'react';
import {LoginForm} from "./LoginForm";
import {Toaster} from "../../components/Toaster";
import {Header} from "../../components/Header";
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {ToasterType} from "../../store/reducers/toasterReducer";

export const LoginPage = () => {
    const toasterMessage = useSelector<AppStateType,string>(state => state.appReducer.toasterMessage)
    const toasterType = useSelector<AppStateType,ToasterType>(state => state.appReducer.toasterType)
    return (
        <div className="w-full flex flex-col justify-between items-center h-screen">
            <Header/>
            <div className="card">
                <LoginForm/>
            </div>
            <Toaster innerText={toasterMessage} type={toasterType}/>
        </div>
    );
};
