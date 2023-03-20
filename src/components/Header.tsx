import React from 'react';
import {useNavigate} from "react-router-dom";
import ArrowIcon from '../assets/icons/arrow.svg'

type HeaderPropsType = {
    title: string
    backButton?: boolean
    children?: React.ReactNode
}
export const Header: React.FC<HeaderPropsType> = ({title, backButton, children}) => {
    const navigate = useNavigate()
    const styles = {
        button: '',
        header: '',
        title: '',
        children: ''
    }
    if (!backButton && !children) {
        styles['button'] = 'hidden'
        styles['title'] = 'text-[#1C5279] basis-3/5 text-[15px] font-bold text-center'
        styles['header'] = 'flex items-center justify-evenly'
    } else if (backButton && !children) {
        styles['button'] = 'flex items-center ml-2 gap-x-2 h-[40px] text-[12px]'
        styles['header'] = 'flex items-center'
        styles['title'] = 'text-[#1C5279] text-[15px] basis-3/5 font-bold text-center'
    } else {
        styles['button'] = 'flex items-center ml-2 gap-x-2 h-[40px] text-[12px]'
        styles['title'] = 'text-[#1C5279] text-[15px] font-bold text-center'
        styles['header'] = 'flex items-center justify-between'
        styles['children'] = 'mr-2'
    }
    return (
        <div className={styles['header']}>
            <div className={styles["button"]}
                 onClick={() => navigate(-1)}>
                <ArrowIcon/>
                Назад
            </div>
            <div className={styles['title']}>{title}</div>
            <div className={styles['children']}>
                {children}
            </div>
        </div>

    );
};

