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
        <div className={'flex justify-center mt-5 mr-8 ml-8'}>
            <div className={'flex gap-4'}>
                <input className={'p-1 rounded-xl'}/>
                <button className={'bg-accent p-1 text-white font-bold rounded-[50%] w-[30px] h-[30px] flex items-center justify-center'} onClick={addOrder}>+</button>
            </div>
        </div>
    );
};




