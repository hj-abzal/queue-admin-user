import React, {useEffect} from 'react';
import {getRestaurantsTC, RestaurantType, UserType} from "../store/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {useNavigate} from "react-router-dom";

export const Restaurants = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const restaurants = useSelector<AppStateType, RestaurantType[]>(state => state.auth.restaurants)
    const user = useSelector<AppStateType, UserType>(state => state.auth.user)

    const onClickRestaurant = (id: number) => {
        navigate(`/home/${id}`)
    }


    useEffect(() => {
        if (user?.id) {
            dispatch(getRestaurantsTC())
        }
    }, [user]);

    return (
        <div>
            <h1>All you restaurants</h1>
            <div>
                {restaurants.map(r => {
                    return <div key={r.id} className="flex gap-7 bg-white mb-0 mx-auto px-7 py-6 rounded-2xl shadow-[0_22px_47px_rgba(28,82,121,0.22)]">
                        <h2>{r.title}</h2>
                        <button className="btn" onClick={() => onClickRestaurant(r.id)}>go to</button>
                    </div>
                })}
            </div>
        </div>
    );
};

