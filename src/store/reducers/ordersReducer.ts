import {Dispatch} from "redux";
import {ordersAPI} from "../../api/api";
import {setIsLoading, setLogged} from "./authReducer";
import {showErrorToast, showSuccessToast, showWarningToast} from "../../components/Toast/ToastManager";


type ActionsType =
    | ReturnType<typeof setOrders>
    | ReturnType<typeof createOrder>
    | ReturnType<typeof setSelectedOrder>
    | ReturnType<typeof updateOrder>
    | ReturnType<typeof deleteOrder>



export type OrdersInitStateType = {
    orders: OrderType[],
    selectedOrder: OrderType,
}
export type OrderType = {
    id: number
    is_ready: boolean
    key: string,
    description: string
}
export const OrdersInitState = {
    orders: [],
    selectedOrder: {} as OrderType,
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
        case 'UPDATE_ORDER':{
            return{
                ...state,
                selectedOrder:{...state.selectedOrder,description:action.description, is_ready:action.is_ready}
            }
        }
        case 'SET_SELECTED_ORDER': {
            return {
                ...state,
                selectedOrder: action.order
            }
        }
        case 'DELETE_ORDER':{
            return {
                ...state,
                orders: state.orders.filter(order=>order.id!==action.id)
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

export const updateOrder = (id: number,description:string,is_ready: boolean) => ({
    type: 'UPDATE_ORDER' as const, id,description,is_ready
});
export const deleteOrder = (id:number) => ({
    type: 'DELETE_ORDER' as const, id
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

export const createOrderTC = (restaurantId: number, comment: string, t: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const order = await ordersAPI.createOrder(restaurantId, comment)
        dispatch(createOrder(order))
        showSuccessToast(t("TOASTER_ORDERS.SUCCESS"));
    } catch (e) {
        showErrorToast(t("TOASTER_ORDERS.ERROR"));
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
export const updateOrderTC = (restaurantId: number, orderId: number,is_ready:boolean,description:string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const res = await ordersAPI.updateOrder(restaurantId, orderId,is_ready,description)
        dispatch(updateOrder(orderId,description,is_ready))
        showSuccessToast('TOASTER_ORDER_EDITING.SUCCESS_DESCRIPTION')
    } catch (e) {
        showWarningToast('TOASTER_ORDER_EDITING.ERROR_DESCRIPTION')

    } finally {
        dispatch(setIsLoading(false))
    }
}

export const deleteOrderTC = (restaurantId: number, orderId: number,t:any) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const token = localStorage.getItem('token');
        if (token) {
            const res = await ordersAPI.deleteOrder(restaurantId,orderId,token)
            dispatch(deleteOrder(orderId))
            showSuccessToast('TOASTER_ORDER_EDITING.SUCCESS_DELETING')

        } else {
            dispatch(setLogged(false))
            showWarningToast('TOASTER_ORDER_EDITING.ERROR_DELETING')
        }
    } catch (e) {
        showWarningToast('Ошибка!')

    } finally {
        dispatch(setIsLoading(false))
    }
}