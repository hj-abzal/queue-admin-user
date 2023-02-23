import React from 'react';

export const Loader = () => {
    return (
        <div className="flex items-center justify-center absolute bg-[gray] bg-opacity-75 mt-[-20px] w-full h-full z-[100] bottom-0">
            <div
                className="inline-block h-10 w-10 animate-spin text-accent rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
    );
};

