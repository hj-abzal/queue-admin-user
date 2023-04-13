import React from 'react';
import {useDispatch} from "react-redux";
import {Input} from "./Input";
import {createOrderTC} from "../store/reducers/ordersReducer";
import {useTranslation} from "react-i18next";

export const AddItemForm: React.FC<{restaurantId: number}> = ({restaurantId}) => {

    const dispatch = useDispatch<any>()
    const [comment, setComment] = React.useState<string>('')
    const {t} = useTranslation();

    const addOrder = () => {
        dispatch(createOrderTC(restaurantId, comment, t))
        setComment('');
    }

    return (
        <div className="flex justify-center">
            <div className="min-w-[350px] flex justify-between mt-4">
                <Input
                    className="w-[250px]"
                    label={t('ORDERS.ORDER_NUMBER')}
                    value={comment}
                    onChangeText={text => setComment(text)}
                    onPressEnter={addOrder}

                />
                <button className="btn" onClick={addOrder}>{t('ORDERS.CREATE')}</button>
            </div>
        </div>
    );
};




