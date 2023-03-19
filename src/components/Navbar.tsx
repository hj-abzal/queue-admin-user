import React, {useEffect, useRef} from 'react';
import Lottie from "lottie-react";
import profile from "../assets/animation/profile.json";
import orders from "../assets/animation/orders.json";
import {useLocation, useNavigate} from "react-router-dom";

type ActiveBarType = 'restaurants' | 'profile';

export const Navbar: React.FC = () => {
    const [activeBar, setActiveBar] = React.useState<ActiveBarType>("restaurants");
    const navigate = useNavigate()
    const location = useLocation()
    const currentLocation = location.pathname.split('/')[2] as ActiveBarType;


    const navbarIcons = [
        {
            name: 'Рестораны',
            url: 'restaurants',
            animation: orders,
            ref: useRef<any>(),
            animationSpeed: 3,
            wrapperClassName: "",
            animationClassName: 'w-[3rem] h-[3rem]',
            labelClassName: 'text-[#1C5279] text-[12px] font-bold mt-1 text-center absolute bottom-[-20px]',
        },
        {
            name: 'Профиль',
            url: 'profile',
            animation: profile,
            ref: useRef<any>(),
            animationSpeed: 1,
            wrapperClassName: "mb-2",
            animationClassName: 'w-[4rem] h-[4rem]',
            labelClassName: 'text-[#1C5279] text-[12px] font-bold mt-1 text-center absolute bottom-[-15px]',
        },
    ]

    useEffect(() => {
        setActiveBar(currentLocation)
    }, [location])

    const onOrdersIconClick = (item: any) => {
        navigate(`/home/${item.url}`);
        setActiveBar(item.name);
        item.ref.current.goToAndPlay(1, true);
        item.ref.current.setSpeed(item.animationSpeed);
    }
    const applyActiveStyle = (url: string, className: string) => url === activeBar ? className : `${className} opacity-50`
    return (
        <div className={'w-full bg-white text-white flex justify-evenly items-center pt-1 pb-3'}>
            {
                navbarIcons.map((item) => {
                    return (
                        <div className={"flex flex-col items-center relative " + item.wrapperClassName}>
                            <Lottie
                                key={item.name}
                                className={applyActiveStyle(item.url, item.animationClassName)}
                                animationData={item.animation}
                                lottieRef={item.ref}
                                onClick={() => onOrdersIconClick(item)}
                                loop={false}
                                autoplay={currentLocation === item.name}
                            />
                            <p className={applyActiveStyle(item.url, item.labelClassName)}>{item.name}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};

