import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
import {HashRouter} from "react-router-dom";

import {store} from "./store/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
);
