import React from 'react';
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {useFormik} from "formik";
import {VisaIcon} from "../../components/Visa";
import {MastercardIcon} from "../../components/MastercardIcon";

const validate = ({cardNumber, expirationDate, cvv, name, email}: initStateType) => {
    let errors = {};
    if (!cardNumber) {
        errors = {...errors, cardNumber: 'Required'};
    } else if (cardNumber.split(' ').join('').length < 16) {
        errors = {...errors, cardNumber: 'Must be 16 characters'};
    }

    if (!expirationDate) {
        errors = {...errors, expirationDate: 'Required'};
    }

    if (!cvv) {
        errors = {...errors, cvv: 'Required'};
    }
    if (!name) {
        errors = {...errors, name: 'Required'};
    }

    if (!email) {
        errors = {...errors, email: 'Required'};
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors = {...errors, email: 'Invalid email address'};
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

export const PaymentForm: React.FC = () => {
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
        },
    });

    const onCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = numbersRegex(e.currentTarget.value);
        const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        const  mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
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
    };
    const onExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = numbersRegex(e.currentTarget.value);
        if (value.length > 4) return;
        setFieldValue('expirationDate', expirationDateFormat(value));
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
        <form className="flex flex-col flex-1" onSubmit={handleSubmit}>
            <div>
                <Input
                    label={"Номер карты"}
                    placeholder="•••• •••• •••• ••••"
                    onChange={onCardNumberChange}
                    value={values.cardNumber}
                    error={(touched.cardNumber && errors.cardNumber) ? errors.cardNumber : ''}
                >
                    <span className='absolute top-5 right-5'>
                        {cardTypeIcons[cardType as 'visa' | 'mastercard']}
                    </span>
                </Input>

                <div className="flex gap-3">
                    <Input
                        label={"Срок действия"}
                        name="expirationDate"
                        placeholder="••/••"
                        onChange={onExpirationDateChange}
                        value={values.expirationDate}
                        error={(touched.expirationDate && errors.expirationDate) ? errors.expirationDate : ''}
                    />
                    <Input
                        label={"CVV/CVC код"}
                        name="cvv"
                        placeholder="•••"
                        maxLength={3}
                        onChange={(e) => {
                            e.currentTarget.value = numbersRegex(e.currentTarget.value);
                            handleChange(e);
                        }}
                        value={values.cvv}
                        error={(touched.cvv && errors.cvv) ? errors.cvv : ''}
                    />
                </div>
                <Input
                    label={"Имя и фамилия"}
                    helperText={"Как на карте — латиницей"}
                    name="name"
                    onChange={(e) => {
                        e.currentTarget.value = latinRegex(e.currentTarget.value);
                        handleChange(e);
                    }}
                    value={values.name}
                    error={(touched.name && errors.name) ? errors.name : ''}
                />
                <Input
                    label={"Электронная почта"}
                    helperText={"Пришлем чек о покупке"}
                    name="email"
                    onChange={(e) => {
                        e.currentTarget.value = emailRegex(e.currentTarget.value);
                        handleChange(e);
                    }} value={values.email}
                    error={(touched.email && errors.email) ? errors.email : ''}
                />
            </div>
            <Button onClick={() => {
                setTouched({
                    cardNumber: true,
                    expirationDate: true,
                    cvv: true,
                    name: true,
                    email: true,
                });
            }} type="submit">Оплатить 46 500 ₸</Button>
        </form>
    );
};