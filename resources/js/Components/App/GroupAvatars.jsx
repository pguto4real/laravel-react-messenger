import { UsersIcon } from "@heroicons/react/24/solid";
import React from "react";

const GroupAvatars = () => {
    return (
        <>
            <div className={`avatar placeholder`}>
                <div className={`bg-gray-400 text-gray-800 rounded-full w-8`}>
                    <UsersIcon className="w-4" />
                </div>
            </div>
        </>
    );
};

export default GroupAvatars;
