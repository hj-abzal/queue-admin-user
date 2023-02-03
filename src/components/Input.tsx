import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useRef} from 'react'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {
    label: string
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    helperText?: string,
}

export const Input: React.FC<InputPropsType> = (
    {
        label,
        type = 'text',
        placeholder = '',
        children,
        onChange, onChangeText,
        error,
        className,
        helperText,
        ...restProps
    }
) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }

    const inputError = error ? 'border-[#DB1414] focus:border-[#DB1414]' : 'border-[rgba(16,20,23,0.14)] focus:border-blue-600'
    const helperTextError = error ? 'text-[#DB1414]' : 'text-gray-500'
    const ref = useRef<HTMLInputElement>(null);

    return (
        <div className={`relative mb-4 ${className}`}>
            <input
                ref={ref}
                id="floating_helper"
                placeholder=" "
                onFocus={(e) => e.target.placeholder = placeholder}
                onBlur={(e) => e.target.placeholder = " "}
                onChange={onChangeCallback}
                className={`w-full h-14 font-normal text-base leading-6 rounded-lg border-solid text-base  px-5 pt-9 pb-4  appearance-none focus:outline-none focus:ring-0 peer caret-blue-600  ${inputError}`}
                type={type || 'text'}
                {...restProps}
            />
            <label
                onClick={(e) => {
                    e.preventDefault();
                    ref.current?.focus();
                }}
                htmlFor="floating_helper"
                className="absolute text-sm leading-5 text-gray-500 duration-300  -translate-y-4  top-[1.4rem] origin-[0] left-5 peer-placeholder-shown:-translate-y-1  peer-placeholder-shown:top-[1.4rem] peer-focus:-translate-y-4"
            >
                {label}
            </label>
            {children}
            {
                (error || helperText) && (
                    <div className={`text-xs leading-4 mt-1.5 ${helperTextError}`}>
                        {error ? error : helperText}
                    </div>
                )
            }
        </div>
    )
}

