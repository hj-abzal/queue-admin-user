import React, {useCallback} from 'react';
import {Input} from "../../components/Input";
import {useFormik} from "formik";
import {VisaIcon} from "../../components/Visa";
import {MastercardIcon} from "../../components/MastercardIcon";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const validate = ({cardNumber, expirationDate, cvv, name, email}: initStateType) => {
    let errors = {};
    if (!cardNumber) {
        errors = {...errors, cardNumber: "PAYMENT_FORM.ERROR.CARD_NUMBER"};
    } else if (cardNumber.split(' ').join('').length < 16) {
        errors = {...errors, cardNumber: "PAYMENT_FORM.ERROR.CARD_NUMBER"};
    }

    if (!expirationDate) {
        errors = {...errors, expirationDate: "PAYMENT_FORM.ERROR.CARD_EXPIRY"};
    }

    if (!cvv) {
        errors = {...errors, cvv: "PAYMENT_FORM.ERROR.CARD_CVC"};
    }
    if (!name) {
        errors = {...errors, name: "PAYMENT_FORM.ERROR.CARD_HOLDER"};
    }

    if (!email) {
        errors = {...errors, email: "PAYMENT_FORM.ERROR.EMAIL"};
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors = {...errors, email: "PAYMENT_FORM.ERROR.EMAIL"};
    }
    return errors;
}

type initStateType = {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    name: string;
    email: string;
}

const cardTypeIcons = {
    visa: <VisaIcon width={55} height={18}/>,
    mastercard: <MastercardIcon width={24} height={18}/>
}

const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;

export const PaymentForm: React.FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [cardType, setCardType] = React.useState<'visa' | 'mastercard' | ''>('');
    const {values, handleSubmit, handleChange, touched, errors, setFieldValue, setTouched} = useFormik({
        initialValues: {
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            name: '',
            email: '',
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            //TODO: send request to server
            //navigate to success page or error page
            navigate('/success');
        },
    });

    const onCardNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = numbersRegex(e.currentTarget.value);
        if (visaRegEx.test(value)) {
            setCardType('visa')
        } else if (mastercardRegEx.test(value)) {
            setCardType('mastercard')
        } else {
            if (cardType)
                setCardType('')
        }

        if (value.length > 16) return;
        setFieldValue('cardNumber', formatCardNumber(value));
    }, []);

    const onExpirationDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = numbersRegex(e.currentTarget.value);
        if (value.length > 4) return;
        setFieldValue('expirationDate', expirationDateFormat(value));
    }, []);

    const onCvvChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = numbersRegex(e.currentTarget.value);
        handleChange(e);
    }, []);

    const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = latinRegex(e.currentTarget.value);
        handleChange(e);
    }, []);

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = emailRegex(e.currentTarget.value);
        handleChange(e);
    }, []);

    const setTouchedAll = () => {
        setTouched({
            cardNumber: true,
            expirationDate: true,
            cvv: true,
            name: true,
            email: true,
        })
    };

    const formatCardNumber = (value: string) => {
        const parts = [];
        for (let i = 0; i < value.length; i += 4) {
            parts.push(value.slice(i, i + 4));
        }
        return parts.length > 1 ? parts.join(" ") : value;
    };
    const expirationDateFormat = (v: string) => v.substring(0, 2) + (v.length > 2 ? "/" : "") + v.substring(2, 4);

    const numbersRegex = (v: string) => v.replace(/[^0-9]/gi, "");
    const emailRegex = (v: string) => v.replace(/[^A-Z-0-9_.-@]/gi, "").replace(/;/i, "");
    const latinRegex = (v: string) => v.replace(/[^A-Z- ]/gi, "").toUpperCase();

    return (
        <form className="card-section" onSubmit={handleSubmit}>
            <div>
                <Input
                    label={t("PAYMENT_FORM.CARD_NUMBER")}
                    placeholder="•••• •••• •••• ••••"
                    onChange={onCardNumberChange}
                    value={values.cardNumber}
                    error={(touched.cardNumber && errors.cardNumber) ? t(errors.cardNumber) : ''}
                >
                    <span className='absolute top-5 right-5'>
                        {cardTypeIcons[cardType as 'visa' | 'mastercard']}
                    </span>
                </Input>

                <div className="flex gap-3">
                    <Input
                        label={t("PAYMENT_FORM.CARD_EXPIRY")}
                        name="expirationDate"
                        placeholder="••/••"
                        onChange={onExpirationDateChange}
                        value={values.expirationDate}
                        error={(touched.expirationDate && errors.expirationDate) ? t(errors.expirationDate) : ''}
                    />
                    <Input
                        label={t("PAYMENT_FORM.CARD_CVC")}
                        name="cvv"
                        placeholder="•••"
                        maxLength={3}
                        onChange={onCvvChange}
                        value={values.cvv}
                        error={(touched.cvv && errors.cvv) ? t(errors.cvv) : ''}
                    />
                </div>
                <Input
                    label={t("PAYMENT_FORM.CARD_HOLDER")}
                    helperText={t("PAYMENT_FORM.CARD_HOLDER_HINT")}
                    name="name"
                    onChange={onNameChange}
                    value={values.name}
                    error={(touched.name && errors.name) ? t(errors.name) : ''}
                />
                <Input
                    label={t("PAYMENT_FORM.EMAIL")}
                    helperText={t("PAYMENT_FORM.EMAIL_HINT")}
                    name="email"
                    onChange={onEmailChange}
                    value={values.email}
                    error={(touched.email && errors.email) ? t(errors.email) : ''}
                />
            </div>
            <button
                className='btn'
                onClick={setTouchedAll}
                type="submit">
                {t("PAYMENT_FORM.PAY")} 46 500 ₸
            </button>
        </form>
    );
};