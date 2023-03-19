import React from 'react';
import {LoginForm} from "./LoginForm";


export const LoginPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-y-20 relative">
            <div className="card">
                <LoginForm/>
            </div>
        </div>
    );
};
