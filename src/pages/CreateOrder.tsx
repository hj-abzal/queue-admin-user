import React, {useState} from 'react';
import {Header} from "../components/Header";
import {useTranslation} from "react-i18next";
import AddIcon from '.././assets/icons/plus-icon.svg'
import {createOrderTC} from "../store/reducers/ordersReducer";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {CustomNumPad} from "../components/CustomNumPad";

export const CreateOrder = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<any>()
    const {restaurantId} = useParams()
    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState<string | null>("")

    const onClickHandler = (id: string) => {
        if (error) setError("")
        setInputValue(prev => {
            if (id === "remove") {
                return prev.slice(0, -1)
            }
            return prev + id
        })
    }

    const createOrder = () => {
        if (!inputValue.length) {
            setError(t('ORDERS_CREATE.ORDER_ERROR'))
            return
        } else if (/^0*$/g.test(inputValue)) {
            setError(t("ORDERS_CREATE.ORDER_ERROR_ZERO"))
            setInputValue("")
            return
        }
        dispatch(createOrderTC(Number(restaurantId), inputValue, t))
        setInputValue("")
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-grow flex-col">
                <Header title={"Create new order"}/>
                <div className="self-center mt-[30px] justify-center flex flex-col">
                    <span className="mb-[8px] text-main text-[22px] font-bold w-full">{t('ORDERS_CREATE.ORDER_NUMBER')}</span>
                    <div
                        className={`w-[240px] h-[60px] pr-[5px] pl-[5px] rounded-[5px] flex justify-center items-center text-[30px] bg-white ${error && 'border-2 border-solid border-[rgb(243,96,96)]'}`}>
                        {inputValue}
                        {error && <span
                            className={"text-[red] text-[15px] text-center w-[100%]"}>{error}</span>}
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <button onClick={() => createOrder()}
                                className="items-center flex justify-center mt-[25px] h-[80px] w-[80px] rounded-[50px] bg-accent shadow-[0_2px_2px_darkslategray] cursor-pointer duration-[0.2s] border-[none] active:bg-[#F84518FF] active:shadow-[0_0_2px_darkslategray] active:translate-y-0.5"
                                style={{WebkitTapHighlightColor: "transparent"}}>
                            <AddIcon/>
                        </button>
                    </div>
                </div>
            </div>
            <CustomNumPad onNumPadClick={onClickHandler}
                          isItemDisabled={(item) => inputValue.length === (item === "remove" ? 0 : 3)}
            />
        </div>
    );
};

