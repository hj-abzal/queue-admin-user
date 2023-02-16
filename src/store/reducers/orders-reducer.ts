import {Dispatch} from "redux";
import {ordersAPI} from "../../api/api";


type ActionsType = ReturnType<typeof getOrders>
export type OrdersInitStateType = typeof OrdersInitState
export type OrdersType = {
    id: number
    is_ready: boolean
    key: string
    restaurant_id: number
}
export const OrdersInitState = {
    orders: [] as OrdersType[],
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
        default:
            return state
    }
}

//ACTION CREATORS

export const getOrders = (orders: OrdersType[]) => ({
    type: "GET_ORDERS" as const, orders
})

//THUNK CREATORS

export const getOrdersTC = (id: number) => async (dispatch: Dispatch) => {
    const orders = await ordersAPI.getAllOrders(id)
    dispatch(getOrders(orders))
}