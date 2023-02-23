import {UserLogging} from "../store/reducers/authReducer";
import axios from 'axios'
import {OrdersType} from "../store/reducers/orders-reducer";

type ResponseOrdersType = {
    id: number
    img: string
    title: string
    url: string
    orders: OrdersType[]
}

const instance = axios.create({
    baseURL: 'https://queue.up.railway.app/api/',
    headers: {
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "Origin, X-Requested-With, Content-Type, Accept"
    }
})


export const authApi = {
    login: (user: UserLogging) => new Promise((resolve, reject) => {
        if (user.email === '111@mail.ru' && user.password === '1111111') {
            resolve({email:'111@mail.ru', password:'1111111',post:'cashier', restaurantId: 45})
        } else {
            reject('error')
        }
    }).then((res)=>res)
}

export const ordersAPI = {
    getAllOrders: (id: number) => instance.get<ResponseOrdersType>(`restaurants/${id}/orders`).then(res => res.data.orders),
    getOrder: (restaurantId: number, orderId: number) => instance.get(`restaurants/${restaurantId}/orders/${orderId}`).then(res => res.data),
    createOrder: (restaurantId: number) => instance.post(`orders`, {restaurant_id: restaurantId}).then(res => res.data),
}




