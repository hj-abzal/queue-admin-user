import {Dispatch} from "redux";
import {authApi, restaurantsAPI} from "../../api/api";
import {showErrorToast, showSuccessToast, showWarningToast} from "../../components/Toast/ToastManager";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import {AppStateType} from "../store";

//TYPES
export type ActionType =
    | ReturnType<typeof setLogged>
    | ReturnType<typeof setUser>
    | ReturnType<typeof setRestaurants>
    | ReturnType<typeof setIsLoading>

type InitStateType = {
    isLogged: boolean;
    isLoading: boolean;
    user: UserType;
    restaurants: RestaurantType[];
}
export type UserLogging = {
    email: string;
    password: string;
}
export type UserType = {
    id: number;
    username: string;
    email: string;
    access_token: string;
    roles: string[];
}

export type RestaurantType = {
    id: number;
    url: string;
    title: string;
    logo: string;
}

//REDUCER
const initState: InitStateType = {
    isLogged: false,
    isLoading: false,
    user: {} as UserType,
    restaurants: [] as RestaurantType[]
}
export const authReducer = (state: InitStateType = initState, action: ActionType): InitStateType => {
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
        case 'SET_IS_LOADING': {
            return {
                ...state,
                isLoading: action.value
            }
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

export const setIsLoading = (value: boolean) => ({
    type: 'SET_IS_LOADING' as const, value
})

//THUNK CREATORS
export const setUserTC = (user: UserLogging, t: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const res = await authApi.login(user)
        dispatch(setLogged(true))
        localStorage.setItem('token', res.access_token)
        localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
        showErrorToast(t("TOASTER_AUTH.ERROR"))
    } finally {
        dispatch(setIsLoading(false))
    }
}

export const tokenTC = (token: string, navigate: NavigateFunction, t: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const user = await authApi.token(token)
        localStorage.setItem('token', user.access_token)
        dispatch(setUser(user))
        showSuccessToast(t("TOASTER_AUTH.SUCCESS"));
    } catch (e) {
        dispatch(setLogged(false));
        localStorage.removeItem('token')
        navigate('/login')
        showWarningToast(t("TOASTER_AUTH.WARNING"))
    } finally {
        dispatch(setIsLoading(false))
    }
}

export const getRestaurantsTC = () => async (
    dispatch: Dispatch,
    getState: () => AppStateType
) => {
    try {
        dispatch(setIsLoading(true))
        const token = getState().auth.user.access_token
        const res = await restaurantsAPI.getAllRestaurants(token)
        dispatch(setRestaurants(res.restaurants))
    } catch (e) {

    } finally {
        dispatch(setIsLoading(false))
    }
}