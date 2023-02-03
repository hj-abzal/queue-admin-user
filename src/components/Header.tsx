import React from 'react';
import ArrowIcon from '../assets/arrow.svg';
import LogoIcon from '../assets/logo.svg';

export const Header = () => {
    const onClickBack = () => {

    }
    return (
        <div className="w-full h-12 flex justify-between px-12 pt-7 mb-[2.3rem]">
            <div className='flex items-center cursor-pointer' onClick={onClickBack}>
                <ArrowIcon/>
                <span className="ml-4 text-blue-500">Назад</span>
            </div>
            <LogoIcon/>
            <svg width="84" height="24" viewBox="0 0 84 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5"
                      d="M4.416 11.256L8.96 5.8H7.2L2.8 11.144V5.8H1.328V17H2.8V11.496L7.36 17H9.232L4.416 11.256ZM17.1578 6.824V5.8H9.86175V7.176H15.3018L9.68575 15.976V17H17.3658V15.624H11.5258L17.1578 6.824Z"
                      fill="blue"/>
                <path
                    d="M39.232 17L36.496 12.312C38 11.88 39.008 10.68 39.008 9.176C39.008 7.272 37.488 5.8 35.424 5.8H31.328V17H32.8V12.488H34.992L37.52 17H39.232ZM35.408 7.176C36.656 7.176 37.536 8.024 37.536 9.192C37.536 10.296 36.656 11.128 35.408 11.128H32.8V7.176H35.408ZM45.2674 17.176C47.7634 17.176 49.4274 15.368 49.4274 12.904V5.8H47.9554V12.904C47.9554 14.648 46.8834 15.784 45.2674 15.784C43.6354 15.784 42.5794 14.648 42.5794 12.904V5.8H41.1074V12.904C41.1074 15.368 42.7554 17.176 45.2674 17.176Z"
                    fill="blue"/>
                <path opacity="0.5"
                      d="M65.8 11.928H70.872V10.568H65.8V7.176H71.48V5.8H64.328V17H71.64V15.624H65.8V11.928ZM80.7281 14.392L75.0321 5.8H73.6561V17H75.1121V8.408L80.8081 17H82.1841V5.8H80.7281V14.392Z"
                      fill="blue"/>
            </svg>

        </div>
    );
};