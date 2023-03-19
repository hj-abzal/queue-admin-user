import {Dispatch} from "redux";
import {authApi, restaurantsAPI} from "../../api/api";
import {toast} from "../../components/Toast/ToastManager";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import {AppStateType} from "../store";
import {onLoader} from "./orders-reducer";

//TYPES
export type ActionType =
    | ReturnType<typeof setLogged>
    | ReturnType<typeof setUser>
    | ReturnType<typeof setRestaurants>

type initStateType = {
    isLogged: boolean
    user: UserType
    restaurants: RestaurantType[]
}
export type UserLogging = {
    email: string,
    password: string
}
export type UserType = {
    id: number
    username: string
    email: string
    access_token: string
    roles: string[]
}

export type RestaurantType = {
    id: number
    url: string
    title: string
    img: string
}

//REDUCER
const initState: initStateType = {
    isLogged: false,
    user: {} as UserType,
    restaurants: [] as RestaurantType[]
}
export const authReducer = (state: initStateType = initState, action: ActionType) => {
    switch (action.type) {
        case 'SET-IS-LOGGED': {
            return {...state, isLogged: action.isLogged}
        }
        case 'SET-USER': {
            return {...state, user: action.user}
        }
        case 'SET-RESTAURANTS': {
            return {...state, restaurants: action.restaurants}
        }
        default:
            return state
    }
}

//ACTION CREATORS
export const setLogged = (isLogged: boolean) => (
    {type: 'SET-IS-LOGGED' as const, isLogged}
)

export const setUser = (user: UserType) => (
    {type: 'SET-USER' as const, user}
)

export const setRestaurants = (restaurants: RestaurantType[]) => (
    {type: 'SET-RESTAURANTS' as const, restaurants}
)

//THUNK CREATORS
export const setUserTC = (user: UserLogging, t: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(onLoader(true))
        const res = await authApi.login(user)
        dispatch(setLogged(true))
        localStorage.setItem('token', res.access_token)
    } catch (e) {
        toast.show({
            content: 'test',
            title: t('LOGIN_FORM.ERROR.INVALID_PASSWORD'),
            type: 'error',
            duration: 3000
        })
    } finally {
        dispatch(onLoader(false))
    }
}

export const tokenTC = (token: string, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
        dispatch(onLoader(true))
        const user = await authApi.token(token)
        localStorage.setItem('token', user.access_token)
        dispatch(setUser(user))
    } catch (e) {
        setLogged(false);
        localStorage.removeItem('token')
        navigate('/login')
    } finally {
        dispatch(onLoader(false))
    }
}

export const getRestaurantsTC = () => async (
    dispatch: Dispatch,
    getState: () => AppStateType
) => {
    try {
        dispatch(onLoader(true))
        const token = getState().auth.user.access_token
        const res = await restaurantsAPI.getAllRestaurants(token)
        dispatch(setRestaurants(res.restaurants))
    } catch (e) {

    } finally {
        dispatch(onLoader(false))
    }
}