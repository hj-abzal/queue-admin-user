import React, {useEffect} from 'react';
import {getRestaurantsTC, RestaurantType, UserType} from "../store/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Restaurants = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const restaurants = useSelector<AppStateType, RestaurantType[]>(state => state.auth.restaurants)
    const user = useSelector<AppStateType, UserType>(state => state.auth.user)
    const {t} = useTranslation();

    const onClickRestaurant = (id: number) => {
        navigate(`/home/restaurants/${id}`)
    }

    useEffect(() => {
        if (user?.id) {
            dispatch(getRestaurantsTC())
        }
    }, [user]);

    return (
        <div className="h-full flex flex-col">
            <div>
                <h1 className={'text-[#1C5279] text-[22px] font-bold mt-6 text-center'}>{t('NAVBAR.RESTAURANTS_NAME')}</h1>
            </div>
            <div className={"w-full bg-white flex flex-col mt-6 p-6 rounded-3xl"}>
                {restaurants.map(r => {
                    return (
                        <div key={r.id}
                             onClick={() => onClickRestaurant(r.id)}
                             className={"relative flex justify-center items-center last:mb-0 mb-7 h-[180px] w-full gap-7 bg-white mb-0 mx-auto px-0 py-0 rounded-2xl shadow-[0_22px_47px_rgba(28,82,121,0.22)]"}
                        >
                            <img className={'h-full w-full brightness-[45%] object-cover rounded-xl'}
                                 src={r.img}
                                 alt="restaurant image"/>
                            <h1 className={'absolute text-[22px] text-[white] h-[19px] w-[230px] flex items-center justify-center text-center'}>
                                {r.title.toUpperCase()}
                            </h1>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

