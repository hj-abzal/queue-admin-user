import React from 'react';
import {OrderType} from "../store/reducers/ordersReducer";
import {useTranslation} from "react-i18next";

type TableDefaultPropsType = {
    orders: OrderType[]
    variant: 'primary' | 'secondary'
    title: string
    onItemClicked: (id: number) => void

}
export const TableDefault: React.FC<TableDefaultPropsType> = ({orders, variant, title, onItemClicked}) => {
    const {t} = useTranslation()
    const classes = {
        primary: {
            table: 'border-accent',
            main: 'bg-accent'
        },
        secondary: {
            table: 'border-[green]',
            main: 'bg-[green]'
        }
    }
    return (
        <div className="flex justify-center">
            <div>
                <div
                    className={`font-medium w-[350px] text-center text-white rounded-[20px_20px_0_0] h-[35px] flex justify-center items-center ${classes[variant].main}`}>{title}</div>
                <div className="inline-block w-[350px] bg-[white] rounded-[0_0_20px_20px]">
                    <div
                        className={`overflow-y-auto h-[200px] border-2 flex flex-col items-center rounded-[0_0_20px_20px] ${classes[variant].table}`}>
                        <table
                            className="min-w-full border text-center font-light">
                            <thead className="border-b font-medium">
                            <tr>
                                <th
                                    scope="col"
                                    colSpan={2}
                                    className="w-[50px] border-r border-neutral-500">
                                    {t('ORDERS.CODE')}
                                </th>

                                <th
                                    scope="col"
                                    colSpan={2}
                                    className="w-[300px] border-r py-[0.5rem] border-neutral-500">
                                    {t('ORDERS.COMMENTS')}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => {
                                return (
                                    <tr className="border-b border-neutral-500"
                                        onClick={() => onItemClicked(order.id)}
                                    >
                                        <td
                                            className="whitespace-nowrap border-r px-6 py-4 border-neutral-500"
                                            colSpan={2}
                                        >
                                            {order.key}
                                        </td>

                                        <td
                                            className="whitespace-nowrap border-r px-6 py-4 border-neutral-500"
                                            colSpan={2}
                                        >
                                            {order.description ? order.description : '---'}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

