import React from 'react';
import {ChooseRestaurantModal} from "../components/ChooseRestaurantModal";
import {useSelector} from "react-redux";
import {AppStateType} from "../store/store";

type ChooseRestaurantPropsType = {
    children: React.ReactNode
}
export const ChooseRestaurant: React.FC<ChooseRestaurantPropsType> = ({children}) => {
    const isRestaurantSelected = useSelector((state: AppStateType) => state.auth.isRestaurantSelected);
    const restaurantId = localStorage.getItem('restaurantId');

    if (!restaurantId) {
        return <ChooseRestaurantModal/>
    }

    return (
        <>
            {children}
        </>
    );
};

