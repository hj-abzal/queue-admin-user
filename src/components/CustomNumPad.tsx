import React from 'react';
import DeleteIcon from "../assets/icons/delete.svg";

type CustomNumPadPropsType = {
    onNumPadClick: (item: string) => void
    isItemDisabled: (item: string) => boolean
}
export const CustomNumPad: React.FC<CustomNumPadPropsType> = ({onNumPadClick, isItemDisabled}) => {

    const padNums = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["0", "remove"]]
    return (
        <div className="flex flex-col pr-[20px] pl-[20px] pb-[40px]">
            {padNums.map((item, index) => (
                <div className="flex justify-around" key={index}>
                    {item.map((innerItem, index) => (
                        <button key={index}
                                onClick={() => {
                                    onNumPadClick(innerItem)
                                }}
                                style={{WebkitTapHighlightColor: "transparent"}}
                                disabled={isItemDisabled(innerItem)}
                                className="text-[25px] m-0.5 h-[45px] w-[100%] bg-white rounded-[5px] cursor-pointer shadow-[3px_3px_3px_grey] enabled:active:bg-[#e1e8ec] enabled:active:shadow-[0_0_2px_rgb(154,161,161)] enabled:active:translate-y-0.1 transition-all duration-[0.09s] ease-in-out disabled:opacity-50">
                            {innerItem === "remove"
                                ? <div className="h-full w-full flex items-center justify-center"><DeleteIcon/></div>
                                : innerItem}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};

