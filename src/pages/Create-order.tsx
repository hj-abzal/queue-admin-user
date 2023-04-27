import React from 'react';
import {Header} from "../components/Header";
import {useTranslation} from "react-i18next";

export const CreateOrder = () => {
    const {t} = useTranslation();

    return (
        <div className="h-full flex flex-col">
            <Header title={"Create new order"}/>

        </div>
    );
};

