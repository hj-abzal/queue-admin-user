import React, {useEffect, useRef} from 'react';
import Lottie from "lottie-react";
import profile from "../assets/animation/profile.json";
import orders from "../assets/animation/orders.json";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {USER_ROLES} from "../store/reducers/authReducer";
import {ROUTES} from "../Routes/Routes";

type NavbarPropsType = {
    role: USER_ROLES
}
export const Navbar: React.FC<NavbarPropsType> = ({role}) => {
    const tabs: {
        [key in USER_ROLES]: string[]
    } = {
        [USER_ROLES.RESTAURANT]: [ROUTES.RESTAURANTS, ROUTES.CASHIERS],
        [USER_ROLES.CASHIER]: [ROUTES.CREATE_ORDER, ROUTES.ORDERS],
        [USER_ROLES.USER]: [],
        [USER_ROLES.ADMIN]: [],
    }

    const [activeBar, setActiveBar] = React.useState<ROUTES>();
    const navigate = useNavigate()
    const location = useLocation()
    const {t} = useTranslation();

    const {restaurantId} = useParams();

    const navbarIcons = [
        {
            name: t("NAVBAR.RESTAURANTS_NAME"),
            url: ROUTES.RESTAURANTS,
            animation: orders,
            ref: useRef<any>(),
            animationSpeed: 3,
            wrapperClassName: "",
            animationClassName: 'w-[3rem] h-[3rem]',
            labelClassName: 'text-[#1C5279] text-[12px] font-bold mt-1 text-center absolute bottom-[-20px]',
        },
        {
            name: "cashiers",
            url: ROUTES.CASHIERS,
            animation: profile,
            ref: useRef<any>(),
            animationSpeed: 1,
            wrapperClassName: "mb-2",
            animationClassName: 'w-[4rem] h-[4rem]',
            labelClassName: 'text-[#1C5279] text-[12px] font-bold mt-1 text-center absolute bottom-[-15px]',
        },
        {
            name: t("NAVBAR.PROFILE"),
            url: ROUTES.RESTAURANT_DETAILS,
            animation: profile,
            ref: useRef<any>(),
            animationSpeed: 1,
            wrapperClassName: "mb-2",
            animationClassName: 'w-[4rem] h-[4rem]',
            labelClassName: 'text-[#1C5279] text-[12px] font-bold mt-1 text-center absolute bottom-[-15px]',
        },
        {
            name: 'create',
            url: ROUTES.CREATE_ORDER,
            animation: profile,
            ref: useRef<any>(),
            animationSpeed: 1,
            wrapperClassName: "mb-2",
            animationClassName: 'w-[4rem] h-[4rem]',
            labelClassName: 'text-[#1C5279] text-[12px] font-bold mt-1 text-center absolute bottom-[-15px]',
        },
        {
            name: 'orders',
            url: ROUTES.ORDERS,
            animation: profile,
            ref: useRef<any>(),
            animationSpeed: 1,
            wrapperClassName: "mb-2",
            animationClassName: 'w-[4rem] h-[4rem]',
            labelClassName: 'text-[#1C5279] text-[12px] font-bold mt-1 text-center absolute bottom-[-15px]',
        },
    ]

    useEffect(() => {
        updateActiveBar();
    }, [location])

    const updateActiveBar = () => {
        for (let routesKey in ROUTES) {
            const value = ROUTES[routesKey as keyof typeof ROUTES];
            const checkValue = typeof restaurantId === 'string' ? value.replace(':restaurantId', restaurantId) : value;
            if (checkValue === location.pathname) {
                setActiveBar(value)
            }
        }
    }


    const onOrdersIconClick = (item: any) => {
        const restaurantId = localStorage.getItem('restaurantId');
        navigate(item.url.replace(':restaurantId', restaurantId || ''));
        setActiveBar(item.name);
        item.ref.current.goToAndPlay(1, true);
        item.ref.current.setSpeed(item.animationSpeed);
    }

    const applyActiveStyle = (url: string, className: string) => url === activeBar ? className : `${className} opacity-50`
    return (
        <div className={'h-[88px] bg-white text-white flex justify-evenly items-center pt-1 pb-3'}>
            {
                navbarIcons
                    .filter(n => tabs[role]?.includes(n.url))
                    .map((item) => {
                        return (
                            <div key={item.url}
                                 className={"flex flex-col items-center relative " + item.wrapperClassName}>
                                <Lottie
                                    key={item.name}
                                    className={applyActiveStyle(item.url, item.animationClassName)}
                                    animationData={item.animation}
                                    lottieRef={item.ref}
                                    onClick={() => onOrdersIconClick(item)}
                                    loop={false}
                                />
                                <p className={applyActiveStyle(item.url, item.labelClassName)}>{item.name}</p>
                            </div>
                        )
                    })
            }
        </div>
    );
};

