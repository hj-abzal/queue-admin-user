import {Dispatch} from "redux";
import {ordersAPI} from "../../api/api";
import {NavigateFunction} from "react-router-dom";
import {AppStateType} from "../store";



type ActionsType = ReturnType<typeof getOrders> | ReturnType<typeof createOrder> | ReturnType<typeof onLoader>
export type OrdersInitStateType = {
    orders: OrdersType[],
    loader: boolean
}
export type OrdersType = {
    id: number
    is_ready: boolean
    key: string
    restaurant_id: number
}
export const OrdersInitState = {
    orders: [],
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
        default:
            return state
    }
}

//ACTION CREATORS

export const getOrders = (orders: OrdersType[]) => ({
    type: "GET_ORDERS" as const, orders
})

export const createOrder = (order: OrdersType) => ({
    type: 'CREATE_ORDER' as const, order
})

export const onLoader = (on: boolean) => ({
    type: 'ON_LOADER' as const, on
})

//THUNK CREATORS

export const getOrdersTC = (id: number) => async (dispatch: Dispatch) => {
    const orders = await ordersAPI.getAllOrders(id)
    dispatch(getOrders(orders))
}

export const createOrderTC = (navigate: NavigateFunction) => async (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(onLoader(true))
    const restaurantId = getState().auth.user.restaurantId
    const order = await ordersAPI.createOrder(restaurantId)
    dispatch(createOrder(order))
    navigate(`/home/${restaurantId}/orders/${order.id}`)
    dispatch(onLoader(false))
}