import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

export const Language: React.FC = () => {
    const {t, i18n} = useTranslation();
    const [isShow, setIsShow] = useState(false);
    const languages = [
        {code: 'kz', name: 'KZ'},
        {code: 'ru', name: 'RU'},
        {code: 'en', name: 'EN'},
    ];

    const onClick = (code: string) => {
        if (i18n.language === code) {
            setIsShow(!isShow)
        } else {
            i18n.changeLanguage(code);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (isShow && !event.target.closest('.language')) {
                setIsShow(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    })

    return (
        <div>
            {
                languages.map((language, index) => {
                    return (
                        <span
                            key={index}
                            className={`text-accent-light mx-3 font-medium text-base leading-6 cursor-pointer ${i18n.language === language.code ? 'opacity-100' : 'opacity-50 md:hidden'}`}
                            onClick={() => onClick(language.code)}
                        >
                            {language.name}
                        </span>
                    )
                })
            }
            {isShow && <div className="relative">
                <div className="hidden md:block absolute top-0 right-0">
                    <div className="bg-white rounded-md shadow-lg flex flex-col py-3.5">
                        {languages.filter(ln => i18n.language !== ln.code).map((language, index) => {
                            return (
                                <span
                                    key={index}
                                    className={`language  w-[82px] h-[45px] font-bold text-lg leading-6 text-black flex items-center justify-center cursor-pointer`}
                                    onClick={() => i18n.changeLanguage(language.code)}
                                >
                                    {language.name}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>}
        </div>
    );
};

