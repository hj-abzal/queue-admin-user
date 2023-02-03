import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
}

export const Button: React.FC<ButtonPropsType> = (
    {
         className,
        ...restProps
    }
) => {

    return (
        <button
            className={`h-14 rounded-lg bg-blue-600 text-white disabled:opacity-40 ${className}`}
            {...restProps}
        />
    )
}

