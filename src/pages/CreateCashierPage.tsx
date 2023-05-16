import React, {useCallback, useState} from 'react';
import {Header} from "../components/Header";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import {Input} from "../components/Input";
import {emailRegex, latinRegex, nameRegex} from "../assets/helpers/regex";
import Select from "react-select";
import {useParams} from "react-router-dom";

const validate = ({password, email, restaurants, name}: initStateType) => {
    let errors = {};
    if (!password) {
        errors = {...errors, name: "PAYMENT_FORM.ERROR.CARD_HOLDER"};
    }
    if (!name) {
        errors = {...errors, name: "PAYMENT_FORM.ERROR.CARD_HOLDER"};
    }
    if (!restaurants) {
        errors = {...errors, name: "PAYMENT_FORM.ERROR.CARD_HOLDER"};
    }
    if (!email) {
        errors = {...errors, email: "LOGIN_FORM.ERROR.EMAIL"};
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors = {...errors, email: "LOGIN_FORM.ERROR.EMAIL"};
    }
    return errors;
}
type initStateType = {
    name: string;
    password: string;
    email: string;
    restaurants: string

}
type CreateEditCashierPageType = {
    edit?: boolean
    create?: boolean
}
export const CreateCashierPage: React.FC<CreateEditCashierPageType> = ({edit, create}) => {
    const {t} = useTranslation()
    const {restaurantId} = useParams()
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const {values, handleSubmit, handleChange, touched, errors, setTouched, setValues} = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            restaurants: ''
        },
        validate,
        onSubmit: values => {
        },
    });
    const options = [
        {value: 'Panda Lamian', label: 'Panda Lamian'},
        {value: 'KFC', label: 'KFC'},
        {value: 'LOL', label: 'LOL'}
    ]
    const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = nameRegex(e.currentTarget.value)
        handleChange(e);
        if (e.currentTarget.value !== values.name){
            setIsEditing(true)
        }else{
            setIsEditing(false)
        }
    }, []);

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = emailRegex(e.currentTarget.value)
        handleChange(e);
        if (e.currentTarget.value !== values.email){
            setIsEditing(true)
        }else{
            setIsEditing(false)
        }
    }, []);

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = latinRegex(e.currentTarget.value)
        handleChange(e);
        if (e.currentTarget.value !== values.password){
            setIsEditing(true)
        }else{
            setIsEditing(false)
        }
    }, []);


    return (
        <form className="card-section flex w-full">
            <div className={'h-full flex flex-col items-center gap-y-7 mb-3'}>
                <Header title={t('CASHIERS_PAGE.TITLE')} backButton/>

                <div className={"h-[420px] w-[350px] flex flex-col bg-white gap-2 rounded-2xl shadow"}>
                    <div
                        className={'h-[40px] flex justify-center items-center bg-slate-300 text-white text-2xl rounded-t-2xl'}>
                        {edit ? t('CREATE_EDIT_CASHIER.EDIT') : t('CREATE_EDIT_CASHIER.CREATE')}
                    </div>
                    <div className={'px-8'}>
                        <div className={'text-sm'}>{t('CREATE_EDIT_CASHIER.NAME')}</div>
                        <Input
                            label={t('CREATE_EDIT_CASHIER.NAME')}
                            name="name"
                            onChange={onNameChange}
                            value={values.name}
                            error={(touched.name && errors.name) ? t(errors.name) : ''}
                        />
                        <div className={'text-sm'}>{t('LOGIN_FORM.EMAIL')}</div>
                        <Input
                            label={t("LOGIN_FORM.EMAIL")}
                            name="email"
                            onChange={onEmailChange}
                            value={values.email}
                            error={(touched.email && errors.email) ? t(errors.email) : ''}
                        />
                        <div className={'text-sm'}>{t('CREATE_EDIT_CASHIER.PASSWORD')}</div>
                        <Input
                            label={t("LOGIN_FORM.PASSWORD")}
                            placeholder={'********'}
                            name="password"
                            type={'password'}
                            onChange={onPasswordChange}
                            value={values.password}
                            error={(touched.password && errors.password) ? t(errors.password) : ''}
                        />
                        <div className={'text-sm'}>{t('CREATE_EDIT_CASHIER.RESTAURANTS')}</div>
                        <Select isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={options}
                                onChange={()=>{setIsEditing(true)}}
                        />
                    </div>
                </div>
                {isEditing &&

                    <div
                        className={`w-[350px] flex ${edit ? 'justify-between' : 'justify-end'}`}>
                        {edit &&
                            <div
                                className={'w-28 h-12 flex justify-center items-center bg-[grey] text-white rounded-2xl'}>{t('ORDERS_INFO.CANCEL')}</div>
                        }
                        <div
                            className={'w-28 h-12 flex justify-center items-center bg-accent text-white rounded-2xl'}>{edit ? t('ORDERS_INFO.SAVE') : t('ORDERS.CREATE')}</div>
                    </div>
                }
            </div>
        </form>
    );
};

