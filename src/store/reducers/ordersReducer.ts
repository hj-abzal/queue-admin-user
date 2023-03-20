import {Dispatch} from "redux";
import {ordersAPI} from "../../api/api";
import {setIsLoading, setLogged} from "./authReducer";
import {showErrorToast, showSuccessToast} from "../../components/Toast/ToastManager";


type ActionsType =
    | ReturnType<typeof setOrders>
    | ReturnType<typeof createOrder>
    | ReturnType<typeof setSelectedOrder>

export type OrdersInitStateType = {
    orders: OrderType[],
    selectedOrder: OrderType | null,
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
}

//REDUCER LOGIC
export const ordersReducer = (state: OrdersInitStateType = OrdersInitState, action: ActionsType): OrdersInitStateType => {
    switch (action.type) {
        case "SET_ORDERS": {
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

export const setOrders = (orders: OrderType[]) => ({
    type: "SET_ORDERS" as const, orders
})

export const createOrder = (order: OrderType) => ({
    type: 'CREATE_ORDER' as const, order
})

export const setSelectedOrder = (order: OrderType) => ({
    type: 'SET_SELECTED_ORDER' as const, order
});

//THUNK CREATORS

export const getOrdersTC = (id: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const token = localStorage.getItem('token');
        if (token) {
            const orders = await ordersAPI.getAllOrders(id, token)
            dispatch(setOrders(orders))
        } else {
            dispatch(setLogged(false))
        }
    } catch (e) {

    } finally {
        dispatch(setIsLoading(false))
    }

}

export const createOrderTC = (restaurantId: number, comment: string, ) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const order = await ordersAPI.createOrder(restaurantId, comment)
        dispatch(createOrder(order))
        showSuccessToast("Новый заказ создан");
    } catch (e) {
        showErrorToast("Ошибка создания заказа");
    } finally {
        dispatch(setIsLoading(false))
    }
}

export const getSelectedOrderTC = (restaurantId: string, orderId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const res = await ordersAPI.getOrder(restaurantId, orderId)
        dispatch(setSelectedOrder(res.order))
    } catch (e) {

    } finally {
        dispatch(setIsLoading(false))
    }
}