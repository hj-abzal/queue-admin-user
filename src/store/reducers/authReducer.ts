import {Dispatch} from "redux";
import {authApi} from "../../api/api";
import {showToaster} from "./toasterReducer";
import {useNavigate} from "react-router-dom";

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
    post: string
}

const initState: initStateType = {
    isLogged: false,
    user: {email: '', password: '', post: ''}
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
export const setUserTC = (user: UserLogging) => async (dispatch: Dispatch) =>{
    try{
        const res:any = await authApi.login(user)
        dispatch(setUser(res))
        dispatch(setLogged(true))
    }
    catch(e){
        dispatch(showToaster(true,'Неправильный пароль','error'))
        setTimeout(()=>{
            dispatch(showToaster(false,'','success'))
        },1500)

    }

}