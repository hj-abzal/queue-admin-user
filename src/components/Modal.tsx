import React, {Dispatch, SetStateAction} from 'react';
import QRCode from 'react-qr-code'
import {useTranslation} from "react-i18next";

interface ModalPropsType {
    qrValue: string
    setIsModalOpen:Dispatch<SetStateAction<boolean>>
}
export const Modal:React.FC<ModalPropsType> = ({setIsModalOpen, qrValue}) => {
    const {t} = useTranslation()
    return (
        <div>
                <div onClick={()=>{setIsModalOpen(false)}}>
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="fixed inset-0 flex justify-center items-center">
                        <div onClick={(event)=>{
                            event.stopPropagation()}} className="bg-white flex flex-col items-center w-4/5 rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">Scan QR code</h2>
                            <QRCode value={qrValue}/>
                        </div>
                    </div>
                </div>
        </div>
    );
};

