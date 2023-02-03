import React from 'react';
import {Header} from "./components/Header";
import {PaymentError} from "./pages/PaymentError/PaymentError";

export const App: React.FC = () => {
   return (
    <div className="w-full h-full">
        <Header/>
        {/*<Main/>*/}
        <PaymentError/>
    </div>
  )
};
