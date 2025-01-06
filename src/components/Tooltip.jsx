import React from 'react';

const Tooltip = ({ text, children }) => {
    return (
        <div className="relative group">
            {children}
            <div className="absolute left-2/3 transform -translate-x-10 bottom-full mb-2 w-max p-2 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {text}
            </div>
        </div>
    );
};

export default Tooltip;