import React from 'react';
import {useTranslation} from "react-i18next";

type PaymentDetailsProps = {
    className?: string
    order: string
    amount: string
    supplier: string
    comment: string
}
export const PaymentDetails: React.FC<PaymentDetailsProps> = ({className, order,amount, supplier, comment}) => {
    const {t} = useTranslation();

    const titleStyle = 'mt-4 mb-2 font-medium text-base leading-6'
    const valueStyle = 'font-bold text-lg leading-6'
    return (
        <div className={className}>
            <div className="font-bold text-[2rem] leading-9">{t("SUCCESS.DETAILS")}</div>
            <div className={titleStyle}>{t("SUCCESS.ORDER")}</div>
            <span className={valueStyle}>{order}</span>

            <div className={titleStyle}>{t("SUCCESS.AMOUNT")}</div>
            <span className={valueStyle}>{amount}</span>

            <div className={titleStyle}>{t("SUCCESS.SUPPLIER")}</div>
            <span className={valueStyle}>{supplier}</span>

            <div className={titleStyle}>{t("SUCCESS.COMMENT")}</div>
            <span className={valueStyle}>{comment || '-'}</span>
        </div>
    );
};

