import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import {authReducer} from "./reducers/authReducer";
import {ordersReducer} from "./reducers/ordersReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer
})

export type AppStateType = ReturnType<typeof rootReducer>;


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

//@ts-ignore
window.store = store;