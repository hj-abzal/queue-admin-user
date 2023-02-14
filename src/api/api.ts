import {UserLogging, UserType} from "../store/reducers/authReducer";

export const authApi = {
    login: (user: UserLogging) => new Promise((resolve, reject) => {
        if (user.email === 'tataev.shokan@gmail.com' && user.password === 'aaa123') {
            resolve({email:'tataev.shokan@gmail.com', password:'123',post:'cashier'})
        } else {
            reject('error')
        }
    }).then((res)=>res)
}