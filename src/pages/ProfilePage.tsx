import React from 'react';
import {ProfileInfo} from "./ProfileInfo";
import {SingleCardPage} from "../components/SingleCardPage";
import {Header} from "../components/Header";


export const ProfilePage = () => {
    return (
        <div>
            <Header title={'Профиль'} backButton/>
            <div className={'flex items-center justify-center mt-[170px]'}>
                <SingleCardPage><ProfileInfo/></SingleCardPage>
            </div>
        </div>
    );
};

