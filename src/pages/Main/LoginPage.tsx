import React from 'react';
import {LoginForm} from "./LoginForm";
import {Header} from "../../components/Header";


export const LoginPage = () => {
    return (
        <div className="w-full flex flex-col items-center h-screen gap-y-20 relative">
            <Header/>
            <div className="card">
                <LoginForm/>
            </div>
        </div>
    );
};
