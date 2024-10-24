import axios from "axios";
import React, { useState } from "react";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";

import {
    EllipsisVerticalIcon,
    LockClosedIcon,
    LockOpenIcon,
    ShieldCheckIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, easeIn, easeOut, motion } from "framer-motion";

const UserOptionsDropdown = ({ conversation }) => {
    const [active, setActive] = useState(false);
    const onBlockUser = () => {
        console.log("Block User");
        if (!conversation.is_user) {
            return;
        }

        axios
            .post(route("user.blockUnblock", conversation.id))
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const changeUserRole = () => {
        console.log("Change User Role");
        if (!conversation.is_user) {
            return;
        }

        axios
            .post(route("user.changeRole", conversation.id))
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                    <>
                        <div>
                            <MenuButton
                                className="flex justify-center items-center w-8 h-8 rounded-full
                     hover:bg-black/40"
                            >
                                <EllipsisVerticalIcon className="h-5 w-5" />
                            </MenuButton>
                        </div>
                        <AnimatePresence>
                            {open && (
                                <MenuItems
                                    static
                                    as={motion.div}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{
                                        ease: "easeOut",
                                        duration: 0.1, // 100ms equivalent to the original "duration-100"
                                        exit: {
                                            ease: "easeIn",
                                            duration: 0.075,
                                        }, // 75ms for "duration-75"
                                    }}
                                    className="absolute right-0 mt-2 w-48 rounded-md 
                        bg-gray-800 shadow-lg z-50"
                                >
                                    <div className="px-1 py-1">
                                        <MenuItem>
                                            <button
                                                onClick={onBlockUser}
                                                className={`${
                                                    active
                                                        ? "bg-black/30 text-white"
                                                        : "text-gray-100"
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {conversation.blocked_at && (
                                                    <>
                                                        <LockOpenIcon className="w-4 h-4 mr-2" />
                                                        Unblock User
                                                    </>
                                                )}
                                                {!conversation.blocked_at && (
                                                    <>
                                                        <LockClosedIcon className="w-4 h-4 mr-2" />
                                                        Block User
                                                    </>
                                                )}
                                            </button>
                                        </MenuItem>
                                    </div>
                                    <div className="px-1 py-1">
                                        <MenuItem>
                                            <button
                                                onClick={changeUserRole}
                                                className={`${
                                                    active
                                                        ? "bg-black/30 text-white"
                                                        : "text-gray-100"
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {conversation.is_admin && (
                                                    <>
                                                        <UserIcon className="w-4 h-4 mr-2" />
                                                        Make Regular User
                                                    </>
                                                )}
                                                {!conversation.is_admin && (
                                                    <>
                                                        <ShieldCheckIcon className="w-4 h-4 mr-2" />
                                                        Make Admin
                                                    </>
                                                )}
                                            </button>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </Menu>
        </>
    );
};

export default UserOptionsDropdown;
