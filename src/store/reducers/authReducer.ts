import {Dispatch} from "redux";
import {authApi} from "../../api/api";
import {toast} from "../../components/Toast/ToastManager";

export type ActionType =
    | ReturnType<typeof setLogged>
    | ReturnType<typeof setUser>

type initStateType = {
    isLogged: boolean
    user: UserType
}
export type UserLogging = {
    email:string,
    password:string
}
export type UserType = {
    email: string,
    password: string,
    post: string,
    restaurantId:number
}

const initState: initStateType = {
    isLogged: false,
    user: {email: '', password: '', post: '',restaurantId:0}
}
export const authReducer = (state: initStateType = initState, action: ActionType) => {
    switch (action.type) {
        case 'SET-IS-LOGGED': {
            return {...state, isLogged: action.isLogged}
        }
        case 'SET-USER': {
            return {...state, user: action.user}
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

//THUNK CREATORS
export const setUserTC = (user: UserLogging,t:any) => async (dispatch: Dispatch) =>{
    try{
        const res:any = await authApi.login(user)
        localStorage.setItem('token',Date.now().toString())
        dispatch(setUser(res))
        dispatch(setLogged(true))    }
    catch(e){
        toast.show({
            content:'test',
            title:t('LOGIN_FORM.ERROR.INVALID_PASSWORD'),
            type:'error',
            duration:3000
        })

    }

}