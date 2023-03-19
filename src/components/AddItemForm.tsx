import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createOrderTC} from "../store/reducers/orders-reducer";

export const AddItemForm: React.FC = () => {

    const dispatch = useDispatch<any>()

    const navigate = useNavigate()

    const addOrder = () => {
        dispatch(createOrderTC(navigate))
    }

    return (
        <div className="h-[60px] w-full flex justify-center ">
            <div className="min-w-[350px] flex justify-between items-center mt-4">
                <input className="h-14 w-[255px] p-1 rounded focus:border-none"/>
                <button className="btn" onClick={addOrder}>Создать</button>
            </div>
        </div>
    );
};




