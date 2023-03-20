import {Dispatch} from "redux";
import {ordersAPI} from "../../api/api";
import {setLogged} from "./authReducer";


type ActionsType =
    | ReturnType<typeof getOrders>
    | ReturnType<typeof createOrder>
    | ReturnType<typeof onLoader>
    | ReturnType<typeof setSelectedOrder>

export type OrdersInitStateType = {
    orders: OrderType[],
    selectedOrder: OrderType | null,
    loader: boolean
}
export type OrderType = {
    id: number
    is_ready: boolean
    key: string,
    description: string
}
export const OrdersInitState = {
    orders: [],
    selectedOrder: null,
    loader: false
}

//REDUCER LOGIC
export const ordersReducer = (state: OrdersInitStateType = OrdersInitState, action: ActionsType): OrdersInitStateType => {
    switch (action.type) {
        case "GET_ORDERS": {
            return {
                ...state,
                orders: action.orders,
            };
        }
        case 'CREATE_ORDER': {
           return {
               ...state,
               orders: [...state.orders, action.order],
           }
        }
        case 'ON_LOADER': {
            return {
                ...state,
                loader: action.on
            }
        }
        case 'SET_SELECTED_ORDER': {
            return {
                ...state,
                selectedOrder: action.order
            }
        }
        default:
            return state
    }
}

//ACTION CREATORS

export const getOrders = (orders: OrderType[]) => ({
    type: "GET_ORDERS" as const, orders
})

export const createOrder = (order: OrderType) => ({
    type: 'CREATE_ORDER' as const, order
})

export const onLoader = (on: boolean) => ({
    type: 'ON_LOADER' as const, on
})

export const setSelectedOrder = (order: OrderType) => ({
    type: 'SET_SELECTED_ORDER' as const, order
});

//THUNK CREATORS

export const getOrdersTC = (id: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(onLoader(true))
        const token = localStorage.getItem('token');
        if (token) {
            const orders = await ordersAPI.getAllOrders(id, token)
            dispatch(getOrders(orders))
        } else {
            dispatch(setLogged(false))
        }
    } catch (e) {

    } finally {
        dispatch(onLoader(false))
    }

}

export const createOrderTC = (restaurantId: number, comment: string, ) => async (dispatch: Dispatch) => {
    try {
        dispatch(onLoader(true))
        const order = await ordersAPI.createOrder(restaurantId, comment)
        dispatch(createOrder(order))
    } catch (e) {

    } finally {
        dispatch(onLoader(false))
    }
}

export const getSelectedOrderTC = (restaurantId: string, orderId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(onLoader(true))
        const res = await ordersAPI.getOrder(restaurantId, orderId)
        dispatch(setSelectedOrder(res.order))
    } catch (e) {

    } finally {
        dispatch(onLoader(false))
    }
}