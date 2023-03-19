import React, {useEffect, useRef} from 'react';
import Lottie from "lottie-react";
import profile from "../assets/animation/profile.json";
import orders from "../assets/animation/orders.json";
import {useLocation, useNavigate} from "react-router-dom";

type activeBarType = 'orders' | 'profile';

export const Navbar: React.FC = () => {
    const [activeBar, setActiveBar] = React.useState<'orders' | 'profile'>("orders");
    const navigate = useNavigate()
    const location = useLocation()
    const currentLocation = location.pathname.split('/')[2] as activeBarType;


    const navbarIcons = [
        {
            name: 'restaurants',
            animation: orders,
            className: 'w-[3rem] h-[3rem]',
            ref: useRef<any>(),
            animationSpeed: 3
        },
        {
            name: 'profile',
            animation: profile,
            className: 'w-[5rem] h-[5rem]',
            ref: useRef<any>(),
            animationSpeed: 1
        },
    ]

    useEffect(() => {
        setActiveBar(currentLocation)
    }, [location])

    const onOrdersIconClick = (item: any) => {
        navigate(`/home/${item.name}`);
        setActiveBar(item.name);
        item.ref.current.goToAndPlay(1, true);
        item.ref.current.setSpeed(item.animationSpeed);
    }

    return (
        <div className={'bg-white text-white absolute bottom-0 w-full h-[90px] flex justify-evenly items-center'}>
            {
                navbarIcons.map((item) => {
                    return (
                        <Lottie
                            key={item.name}
                            className={item.name === activeBar ? item.className : `${item.className} opacity-50`}
                            animationData={item.animation}
                            lottieRef={item.ref}
                            onClick={() => onOrdersIconClick(item)}
                            loop={false}
                            autoplay={currentLocation === item.name}
                        />
                    )
                })
            }
        </div>
    );
};

