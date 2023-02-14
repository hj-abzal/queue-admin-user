import React, {useEffect} from 'react';
import ArrowIcon from '../assets/icons/arrow.svg';
import LogoIcon from '../assets/icons/logo.svg';
import {useLocation} from "react-router-dom";
import {Language} from "./Language";

export const Header = () => {
    const [isBack, setIsBack] = React.useState(false);
    let location = useLocation();

    const onClickBack = () => {
        window.history.back();
    }

    useEffect(() => {
        if (location.pathname === '/') {
            setIsBack(true)
        } else {
            if (isBack)
                setIsBack(false)
        }
    }, [location]);

    return (
        <div className="sm: w-full h-12 flex px-12 pt-7 mb-[2.3rem] md:px-5">
            <div className={'sm: basis-4/5'}>
                <LogoIcon/>
            </div>
            <Language/>
        </div>
    );
};