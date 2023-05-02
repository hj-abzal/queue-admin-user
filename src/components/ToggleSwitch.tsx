import {ChangeEvent} from 'react';

type ToggleSwitchProps = {
    id?: string;
    checked: boolean;
    disabled?: boolean
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const ToggleSwitch = ({id, checked, disabled, onChange}: ToggleSwitchProps) => {

    return (
        <>
            <input
                className="h-0 w-0 invisible peer"
                id={id}
                type="checkbox"
                disabled={disabled}
                checked={checked}
                onChange={onChange}
            />
            <label
                style={{WebkitTapHighlightColor: "transparent"}}
                className={'peer-checked:bg-green-500 peer-checked:[&>span]:left-[calc(100%_-_2px)] peer-checked:[&>span]:-translate-x-full peer-checked:[&:active>span]:w-[30px] peer-disabled:opacity-50 peer-disabled:[&:active>span]:w-[55px] flex items-center justify-between bg-[grey] cursor-pointer w-[50px] h-[30px] relative transition-[background-color] duration-[0.2s] rounded-full'}
                htmlFor={id}
            >
                <span className="content-[''] absolute bg-white w-[25px] h-[25px] transition-[0.2s] shadow-[0_0_2px_0_rgba(10,10,10,0.29)] rounded-[45px] left-0.5 top-0.5" />
            </label>
        </>
    );
};