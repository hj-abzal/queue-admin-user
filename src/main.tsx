import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Main} from "./pages/Main/Main";
import {PaymentSuccess} from "./pages/PaymentSuccess";
import {PaymentError} from "./pages/PaymentError";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Main/>,
            },
            {
                path: "success",
                element: <PaymentSuccess/>,
            },
            {
                path: "error",
                element: <PaymentError/>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)
