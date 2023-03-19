import {UserLogging, UserType} from "../store/reducers/authReducer";
import axios from 'axios'
import {OrdersType} from "../store/reducers/orders-reducer";

//TYPES

export type LoginResponseType = {
    access_token: string
}

type ResponseOrdersType = {
    id: number
    img: string
    title: string
    url: string
    orders: OrdersType[]
}

type ResponseRestaurantsType = {
    restaurants: ResponseOrdersType[]
}

const baseURL = 'https://queue-back-development.up.railway.app/'
const localURL = 'http://localhost:8080/'
const instance = axios.create({
    baseURL: baseURL,
    headers: {
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "Origin, X-Requested-With, Content-Type, Accept"
    }
})


export const authApi = {
    login: (user: UserLogging) => instance.post<LoginResponseType>(`auth/login`, user).then(res => res.data),
    token: (token: string) => {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return instance.post<UserType>(`auth/token`).then(res => res.data)
    },
}

export const restaurantsAPI = {
    getAllRestaurants: (token: string) => {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return instance.get<ResponseRestaurantsType>(`/restaurants`).then(res => res.data)
    },
}

export const ordersAPI = {
    getAllOrders: (id: number, token: string) => {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return instance.get<ResponseOrdersType>(`restaurants/${id}/orders`)
            .then(res => res.data.orders)
    },
    getOrder: (restaurantId: number, orderId: number) => instance.get(`restaurants/${restaurantId}/orders/${orderId}`).then(res => res.data),
    createOrder: (restaurant_id: number, description: string = '') => {
        return instance.post(`restaurants/${restaurant_id}/orders/`, {
            restaurant_id,
            description
        })
            .then(res => res.data)
    },
}




