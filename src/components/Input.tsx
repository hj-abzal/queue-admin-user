import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useRef} from 'react'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {
    label: string
    onChangeText?: (value: string) => void
    onPressEnter?: () => void
    error?: string | null
    helperText?: string | null
}

export const Input: React.FC<InputPropsType> = React.memo((
        {
            label,
            type = 'text',
            placeholder = '',
            children,
            onChange,
            onChangeText,
            onPressEnter,
            error,
            className,
            helperText,
            onKeyPress,
            ...restProps
        }
    ) => {

        const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
            onChange
            && onChange(e)

            onChangeText && onChangeText(e.currentTarget.value)
        }

        const onKeyPressCallback = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                e.currentTarget.blur()
                onPressEnter && onPressEnter()

                onKeyPress && onKeyPress(e)
            }

        }

        const inputError = error ? 'border-error focus:border-error' : 'border-secondary focus:border-accent-light';
        const helperTextError = error ? 'text-error' : 'text-primary';
        const ref = useRef<HTMLInputElement>(null);

        return (
            <div className={`relative mb-4 ${className}`}>
                <input
                    ref={ref}
                    id="floating_helper"
                    placeholder=" "
                    onKeyPress={onKeyPressCallback}
                    onFocus={(e) => e.target.placeholder = placeholder}
                    onBlur={(e) => e.target.placeholder = " "}
                    onChange={onChangeCallback}
                    className={`w-full h-14 font-normal text-base leading-6 rounded-lg border-solid text-base  px-5 pt-9 pb-4  appearance-none focus:outline-none focus:ring-0 peer caret-accent-light  ${inputError}`}
                    type={type || 'text'}
                    {...restProps}
                />
                <label
                    onClick={(e) => {
                        e.preventDefault();
                        ref.current?.focus();
                    }}
                    htmlFor="floating_helper"
                    className="absolute text-sm leading-5 text-primary duration-300  -translate-y-4  top-[1.4rem] origin-[0] left-5 peer-placeholder-shown:-translate-y-1  peer-placeholder-shown:top-[1.4rem] peer-focus:-translate-y-4"
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
)
