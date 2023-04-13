import {UserLogging, UserType} from "../store/reducers/authReducer";
import axios from 'axios'
import {OrderType} from "../store/reducers/ordersReducer";

//TYPES

export type LoginResponseType = {
    access_token: string
}

type ResponseOrdersType = {
    id: number
    logo: string
    title: string
    url: string
    orders: OrderType[]
}

type ResponseOrderType = {
    order: OrderType
}

type ResponseRestaurantsType = {
    restaurants: ResponseOrdersType[]
}

const baseURL = 'https://queue-back-development.up.railway.app/'
const localURL = 'http://localhost:8080/'
const prod = 'https://queue.up.railway.app'
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
    getOrder: (restaurantId: string, orderId: string) => {
        return instance.get<ResponseOrderType>(`restaurants/${restaurantId}/orders/${orderId}`)
            .then(res => res.data)
    },
    createOrder: (restaurant_id: number, key: string = '') => {
        return instance.post(`restaurants/${restaurant_id}/orders/`, {
            restaurant_id,
            key
        })
            .then(res => res.data)
    },
    updateOrder: (
        restaurantId: number,
        orderId: number,
        is_ready: boolean,
        description: string
    ) => {
        return instance.put(`restaurants/${restaurantId}/orders/${orderId}`, {
            is_ready,
            description
        })
            .then(res => res.data)
    },
    deleteOrder:(
        restaurantId: number,
        orderId: number,
        token:string
    )=>{
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return instance.delete(`/restaurants/${restaurantId}/orders/${orderId}`)
            .then(res=>res.data)
    },
}




