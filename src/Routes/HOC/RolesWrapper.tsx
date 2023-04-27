import React from "react";
import {USER_ROLES, UserType} from "../../store/reducers/authReducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {DEFAULT_ROLE_ROUTE} from "../Routes";

type RolesGuardPropsType = {
    children: React.ReactNode,
    roles: USER_ROLES[]
}
export const RolesGuard: React.FC<RolesGuardPropsType> = React.memo(({children, roles}) => {
    const user = useSelector<AppStateType, UserType>(state => state.auth.user);

    if (!user?.roles) return <></>;
    if (roles.length === 0) {
        return <>
            {children}
        </>;
    }

    if (!user?.roles.some(role => roles.includes(role))) {
        const role = user.roles.filter(r => r !== USER_ROLES.USER && r !== USER_ROLES.ADMIN);
        return <Navigate to={DEFAULT_ROLE_ROUTE[role[0]]} />
    }

    return (
        <>
            {children}
        </>
    )
});