import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {Language} from "./Language";
import {useLocation, useNavigate} from "react-router-dom";


export const Header: React.FC = () => {

    const {t} = useTranslation();
    const navigate = useNavigate()
    const location = useLocation()
    const back = location.pathname.split('/')[4]

    const [backToMain, setBackToMain] = React.useState(false)

    const createOrder = () => {
        backToMain ? navigate(-1) : navigate('45/orders/')
        setBackToMain(!backToMain)
    }

    useEffect(() => {
        back === 'create' ?  setBackToMain(true) : setBackToMain(false)
    })

    return (
        <div>
            <Language/>
        </div>
    );
};

