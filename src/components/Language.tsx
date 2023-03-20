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
        <div className={'flex'}>
            {
                languages.map((language, index) => {
                    return (
                        <span
                            key={index}
                            className={`flex items-center text-[#1C5279] mx-2 font-medium text-base leading-6 cursor-pointer ${i18n.language === language.code ? 'opacity-100' : 'opacity-40'}`}
                            onClick={() => onClick(language.code)}
                        >
                            {language.name}
                        </span>
                    )
                })
            }
        </div>
    );
};

