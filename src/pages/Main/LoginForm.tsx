import React, {useCallback, useEffect} from 'react';
import {Input} from "../../components/Input";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setUserTC} from "../../store/reducers/authReducer";
import {AppStateType} from "../../store/store";

const validate = ({password, email}: initStateType) => {
    let errors = {};
    if (!password) {
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
    password: string;
    email: string;
}


export const LoginForm: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const isLogged = useSelector<AppStateType, boolean>(state => state.auth.isLogged)
    const {values, handleSubmit, handleChange, touched, errors, setFieldValue, setTouched} = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validate,
        onSubmit: values => {
            dispatch(setUserTC(values))
        },
    });


    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = latinRegex(e.currentTarget.value);
        handleChange(e);
    }, []);

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = emailRegex(e.currentTarget.value);
        handleChange(e);
    }, []);

    const setTouchedAll = () => {
        setTouched({
            password: true,
            email: true,
        })
    };


    const emailRegex = (v: string) => v.replace(/[^A-Z-0-9_.-@]/gi, "").replace(/;/i, "");
    const latinRegex = (v: string) => v.replace(/[^A-Z-0-9_ ]/gi, "");
    useEffect(() => {
        if (isLogged) {
            navigate('/home/orders')
        }
    }, [isLogged])
    return (
        <form className="card-section" onSubmit={handleSubmit}>
            <div>
                <Input
                    label={t("PAYMENT_FORM.EMAIL")}
                    helperText={'Введите вашу почту для авторизации'}
                    name="email"
                    onChange={onEmailChange}
                    value={values.email}
                    error={(touched.email && errors.email) ? t(errors.email) : ''}
                />

                <Input
                    label={'Пароль'}
                    placeholder={'********************'}
                    name="password"
                    type={'password'}
                    onChange={onPasswordChange}
                    value={values.password}
                    error={(touched.password && errors.password) ? t(errors.password) : ''}
                />
            </div>
            <button
                className='btn'
                onClick={setTouchedAll}
                type="submit">
                {'Войти'}
            </button>
        </form>
    );
};