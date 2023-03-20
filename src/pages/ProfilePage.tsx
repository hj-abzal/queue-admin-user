import React from 'react';
import {ProfileHeader} from "../components/ProfileHeader";
import {ProfileInfo} from "./ProfileInfo";
import {SingleCardPage} from "../components/SingleCardPage";


export const ProfilePage = () => {
    return (
        <div>
            <ProfileHeader/>
            <div className={'flex items-center justify-center mt-[170px]'}>
                <SingleCardPage><ProfileInfo/></SingleCardPage>
            </div>
        </div>
    );
};

