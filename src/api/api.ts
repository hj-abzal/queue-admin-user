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
        if (user.email === 'tataev.shokan@gmail.com' && user.password === 'aaa123') {
            resolve({email:'tataev.shokan@gmail.com', password:'123',post:'cashier'})
        } else {
            reject('error')
        }
    }).then((res)=>res)
}

export const ordersAPI = {
    getAllOrders: (id: number) => instance.get<ResponseOrdersType>(`restaurants/${id}/orders`).then(res => res.data.orders)
}




