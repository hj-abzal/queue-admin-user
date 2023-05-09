import React, {useEffect} from 'react';
import {getRestaurantsTC, RestaurantType, UserType} from "../store/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Header} from "../components/Header";
import ProfileIcon from "../assets/icons/profileIcon.svg";

export const Restaurants = () => {
    const navigate = useNavigate();
    const {restaurantId} = useParams()
    const dispatch = useDispatch<any>();
    const restaurants = useSelector<AppStateType, RestaurantType[]>(state => state.auth.restaurants)
    const user = useSelector<AppStateType, UserType>(state => state.auth.user)
    const {t} = useTranslation();

    const onClickRestaurant = (id: number) => {
        navigate(`/home/restaurants/${id}/orders`)
    }

    useEffect(() => {
        if (user?.id) {
            dispatch(getRestaurantsTC())
        }
    }, [user]);

    return (
        <div className="flex flex-col">
            <Header title={t('NAVBAR.RESTAURANTS_NAME')}>
                <NavLink to={`/home/restaurants/${restaurantId}/profile`}
                         className="flex flex-col items-center">
                    <ProfileIcon/>
                </NavLink>
            </Header>
            <div className={"w-full bg-white flex flex-col mt-6 p-6 gap-y-9 rounded-3xl"}>
                {restaurants.map(r => {
                    return (
                        <div key={r.id}
                             onClick={() => onClickRestaurant(r.id)}
                             className={"h-[180px] w-full flex items-center bg-slate-300 last:mb-0 mb-7  gap-7  mb-0 mx-auto px-0 py-0 rounded-2xl shadow"}
                        >
                            <div
                                className={'h-[180px] flex flex-col items-start justify-evenly text-[black] ml-2'}>
                                <h1 className={'text-lg font-bold'}>
                                    {r.title.toUpperCase()}
                                </h1>
                                <div>Mega Park</div>
                                <div className={'w-full md:w-[260px]'}>
                                    <p className={'text-ellipsis overflow-hidden whitespace-nowrap'}>{`${t('CASHIERS_PAGE.TITLE')}: Азиз, Абзал, Алдияр, Ернар, Шокан`}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    );
};

