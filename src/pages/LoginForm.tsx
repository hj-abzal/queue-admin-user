import React, {useCallback, useEffect} from 'react';
import {Input} from "../components/Input";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setUserTC} from "../store/reducers/authReducer";
import {AppStateType} from "../store/store";
import {Language} from "../components/Language";
import {emailRegex} from "../assets/helpers/regex";

const validate = ({password, email}: initStateType) => {
    let errors = {};
    if (!password) {
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
    password: string;
    email: string;
}


export const LoginForm: React.FC = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const isLogged = useSelector<AppStateType, boolean>(state => state.auth.isLogged)
        const {values, handleSubmit, handleChange, touched, errors, setTouched, setValues} = useFormik({
            initialValues: {
                password: '',
                email: '',
            },
            validate,
            onSubmit: values => {
                dispatch(setUserTC(values, t))
            },
        });

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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



    useEffect(() => {
        if (isLogged) {
            navigate(`/home/restaurants`)
        }
    }, [isLogged])

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setValues(JSON.parse(user))
        }
    }, [])
    return (
        <form className="card-section" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-center">Queue Admin</h2>
            <div>
                <Input
                    label={t("LOGIN_FORM.EMAIL")}
                    helperText={t("LOGIN_FORM.EMAIL_HINT")}
                    name="email"
                    onChange={onEmailChange}
                    value={values.email}
                    error={(touched.email && errors.email) ? t(errors.email) : ''}
                />

                <Input
                    label={t("LOGIN_FORM.PASSWORD")}
                    placeholder={'********'}
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
                {t('LOGIN_FORM.LOG_IN')}
            </button>
            <div
                className={'mt-4 flex justify-between'}
            >
                <Language/>
                {/*<div*/}
                {/*    className={'text-sm text-accent-light'}>*/}
                {/*    {t('LOGIN_FORM.FORGOT_PASSWORD')}*/}
                {/*</div>*/}
            </div>
        </form>
    );
};