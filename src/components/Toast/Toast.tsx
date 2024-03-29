import React, {useEffect} from "react";
import {ToasterType} from "./ToastManager";
import {useTranslation} from "react-i18next";

export interface ToastProps {
    id: string;
    destroy: () => void;
    title: string;
    type: ToasterType;
    duration?: number;
}

const Toast: React.FC<ToastProps> = (props) => {
    const {t} = useTranslation();
    const { destroy, title, duration = 0, id, type } = props;

    useEffect(() => {
        if (!duration) return;
        const timer = setTimeout(() => {
            destroy();
        }, duration);

        return () => clearTimeout(timer);
    }, [destroy, duration]);

    return (
        <div id="toast"
             className={`flex items-center w-full max-w-xs p-4 transition-opacity mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 animate-bounce`}
             role="alert">
            <div
                id={'error'}
                className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200 ${type==='error'?`block`:'hidden'}`}>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                </svg>
            </div>
            <div
                id={'success'}
                className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200 ${type==='success'?`block`:'hidden'}`}>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                </svg>
            </div>
            <div
                id={'warning'}
                className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-800 dark:text-orange-200 ${type==='warning'?`block`:'hidden'}`}>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"></path>
                </svg>
            </div>
            <div id={'innerText'} className="ml-3 text-sm font-normal">{t(title)}</div>
        </div>
    );
};

const shouldRerender = (prevProps: ToastProps, nextProps: ToastProps) => {
    return prevProps.id === nextProps.id;
};
export default React.memo(Toast, shouldRerender);