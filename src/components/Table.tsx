import React from 'react';
import {OrdersType} from "../store/reducers/orders-reducer";


type TableProps = {
    title: string,
    variant: 'primary' | 'secondary'
    orders: OrdersType[],
    onItemClicked: (id: number) => void
}

export const Table: React.FC<TableProps> = ({orders, title, variant, onItemClicked}) => {

    const classes = {
        primary: {
            table: 'flex justify-center basis-[68%] ml-2 mt-10',
            main:  'flex text-center font-medium justify-center text-[white] overflow-y-scroll p-2.5 rounded-[20px_20px_0_0] border-[none] bg-accent',
            border: 'flex flex-row border w-80 justify-evenly flex-wrap overflow-y-scroll rounded-[0_0_8px_8px] border-solid border-2 p-1 h-[200px] border-[#fe540e]',
            order: 'h-20 font-bold p-2 min-w-[80px] text-[20px] bg-white flex justify-center items-center shadow-[0_2px_5px_0_rgba(0,0,0,0.4)]  m-[5px] px-[5px] rounded-[10px] border-2 border-[#fe540e]'
        },
        secondary: {
            table: 'flex justify-center basis-[68%] ml-2 mt-10 mb-[100px]',
            main:  'flex text-center font-medium justify-center text-[white] overflow-y-scroll p-2.5 rounded-[20px_20px_0_0] border-[none] bg-[green]',
            border: 'flex flex-row border w-80 justify-evenly flex-wrap overflow-y-scroll rounded-[0_0_8px_8px] border-solid border-2 p-1 h-[200px] border-[green]',
            order: 'h-20 font-bold p-2 min-w-[80px] text-[20px] bg-white flex justify-center items-center shadow-[0_2px_5px_0_rgba(0,0,0,0.4)]  m-[5px] px-[5px] rounded-[10px] border-2 border-[green]'
        }
    }

    return (
        <div className={classes[variant].table}>
            <div className={'flex flex-col'}>
                <div>
                    <div
                        className={classes[variant].main}>{title}</div>
                    <div
                        className={classes[variant].border}>
                        {orders.map((t) => {
                            if (t.is_ready) return <button key={t.id}
                                                           className={classes[variant].order}
                                                           onClick={() => onItemClicked(t.id)}>{t.key}
                            </button>
                            if (!t.is_ready) return <button key={t.id}
                                                            className={classes[variant].order}
                                                            onClick={() => onItemClicked(t.id)}>{t.key}
                            </button>
                        })}</div>
                </div>
            </div>
        </div>
    );
};
