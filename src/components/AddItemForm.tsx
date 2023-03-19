import React from 'react';
import {useDispatch} from "react-redux";
import {createOrderTC} from "../store/reducers/orders-reducer";
import {Input} from "./Input";

export const AddItemForm: React.FC<{restaurantId: number}> = ({restaurantId}) => {

    const dispatch = useDispatch<any>()
    const [comment, setComment] = React.useState<string>('')

    const addOrder = () => {
        dispatch(createOrderTC(restaurantId, comment))
        setComment('');
    }

    return (
        <div className="h-[60px] w-full flex justify-center ">
            <div className="min-w-[350px] flex justify-between mt-4">
                <Input
                    className="w-[250px]"
                    label="Комментарий (не обязательно)"
                    value={comment}
                    onChangeText={text => setComment(text)}
                    onPressEnter={addOrder}

                />
                <button className="btn" onClick={addOrder}>Создать</button>
            </div>
        </div>
    );
};




