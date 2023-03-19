import React, {ReactNode} from 'react';


export const SingleCardPage = ({children}: {children: ReactNode }) => {
    return (
        <div className="flex flex-col justify-center items-center h-full gap-y-20 relative">
            <div className="card">
                {children}
            </div>
        </div>
    );
};
