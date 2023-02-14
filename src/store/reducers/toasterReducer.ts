export type ToasterType = 'success' | 'error' | 'warning'
type InitStateType = {
    isToasterVisible: boolean
    toasterMessage:string
    toasterType: ToasterType
}

const initState:InitStateType = {
    isToasterVisible: false,
    toasterMessage: '',
    toasterType: 'success'
}
type ActionType =
    | ReturnType<typeof showToaster>
export const showToaster = (isToasterVisible: boolean, toasterMessage:string,toasterType: ToasterType) => ({type:'SHOW-TOASTER',isToasterVisible, toasterMessage, toasterType})
export const toasterReducer = (state: InitStateType = initState, action: ActionType) => {
    switch (action.type) {
        case "SHOW-TOASTER":{
            return {...state, isToasterVisible:action.isToasterVisible, toasterMessage:action.toasterMessage, toasterType:action.toasterType}
        }
        default: {
            return state
        }
    }
}