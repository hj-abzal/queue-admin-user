import React from 'react';

interface ModalPropsType {
    children: React.ReactNode
}

export const Modal: React.FC<ModalPropsType> = ({children}) => {
    return (
        <div>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="fixed inset-0 flex justify-center items-center">
                <div className="bg-white flex flex-col items-center w-4/5 rounded-lg p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

