import { Link, usePage } from "@inertiajs/react";
import React from "react";
import UserAvatar from "./UserAvatar";

import UserOptionsDropdown from "./UserOptionsDropdown";
import GroupAvatars from "./GroupAvatars";

const ConversationItem = ({
    conversation,
    online = null,
    selectedConversation = null,
}) => {
    const page = usePage();
    const currentUser = page.props.auth.user;
    let classes = "border-transparent";
    if (selectedConversation) {
        if (
            !selectedConversation.is_group &&
            !conversation.is_group &&
            selectedConversation.id == conversation.id
        ) {
            classes += "border-blue-500 bg-black/20";
        }
        if (
            selectedConversation.is_group &&
            conversation.is_group &&
            selectedConversation.id == conversation.id
        ) {
            classes += "border-blue-500 bg-black/20";
        }
    }
    // console.log("currentUser.is_admin", currentUser.is_admin);
    // console.log("conversation.is_user", conversation.is_user);
    return (
        <Link
            href={
                conversation.is_group
                    ? route("chat.group", conversation)
                    : route("chat.user", conversation)
            }
            preserveState
            className={`conversation-item flex items-center gap-2 p-2 
                text-gray-300 transition-all cursor-pointer border-l-4
                hover:bg-black/30  ${classes}  ${
                conversation.is_user && conversation.is_admin
                    ? " pr-2 "
                    : "pr-4"
            }`}
        >
            {conversation.is_user && (
                <UserAvatar user={conversation} online={online} />
            )}
            {conversation.is_group && <GroupAvatars />}
            <div
                className={
                    `flex-1 text-xs max-w-full overflow-hidden` +
                    (conversation.is_user && conversation.blocked_at
                        ? " opacity-50"
                        : "")
                }
            >
                <div className="flex gap-1 justify-between items-center">
                    <h3
                        className="text-sm font-semibold overflow-hidden 
                    text-nowrap text-ellipsis"
                    >
                        {conversation.name}
                    </h3>
                    {conversation.last_message_date && (
                        <span className="text-nowrap">
                            {conversation.last_message_date}
                        </span>
                    )}
                </div>
                {conversation.last_message && (
                    <span className="text-nowrap text-xs overflow-hidden text-ellipsis">
                        {conversation.last_message}
                    </span>
                )}
            </div>
            {currentUser.is_admin && conversation.is_user && (
                <UserOptionsDropdown conversation={conversation} />
            )}
        </Link>
    );
};

export default ConversationItem;
