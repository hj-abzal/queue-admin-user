import React, {useEffect} from 'react';
import {getRestaurantsTC, RestaurantType, setRestaurantSelected, UserType} from "../store/reducers/authReducer";
import {AppStateType} from "../store/store";
import {useDispatch, useSelector} from "react-redux";
import ReactDOM from "react-dom";
import {Modal} from "./Modal";
import {useNavigate} from "react-router-dom";

export const ChooseRestaurantModal: React.FC = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const user = useSelector<AppStateType, UserType>(state => state.auth.user);
    const restaurants = useSelector<AppStateType, RestaurantType[]>(state => state.auth.restaurants);

    const onClickRestaurant = (id: number) => {
        localStorage.setItem('restaurantId', id.toString());
        navigate(`/home/restaurants/${id}/orders`);
        dispatch(setRestaurantSelected(true))
    }

    useEffect(() => {
        if (user?.id) {
            dispatch(getRestaurantsTC())
        }
    }, [user]);

    useEffect(() => {
        if (restaurants.length === 1) {
            onClickRestaurant(restaurants[0].id)
        }
    }, [restaurants]);


    return (
        ReactDOM.createPortal(<Modal>
            <div>
                <h2>Choose your restaurant</h2>
                <ul>
                    {
                        restaurants.map(r => {
                                return <li
                                    key={r.id}
                                    className="flex justify-between items-center p-1  hover:cursor-pointer hover:bg-gray-200 rounded"
                                    onClick={() => onClickRestaurant(r.id)}
                                >
                                    <img src={r.logo} alt="logo" className="w-[30px] rounded"/>
                                    {r.title}
                                </li>
                            }
                        )
                    }
                </ul>
            </div>
        </Modal>, document.getElementById('portal') as HTMLElement)
    );
};

