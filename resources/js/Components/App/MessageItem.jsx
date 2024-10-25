import { usePage } from "@inertiajs/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import UserAvatar from "./UserAvatar";
import { formatMessageDateLong } from "@/helpers";

const MessageItem = ({ message, attachmentClick }) => {
    const page = usePage();
    const currentUser = page.props.auth.user;
    console.log("currentUser",currentUser)
    console.log("message",message)
    return (
        <div
            className={
                "chat" +
                (message.sender_id === currentUser.id
                    ? " chat-end"
                    : " chat-start")
            }
        >
            <UserAvatar user={message.sender} />
            <div className="chat-header">
                {message.sender_id !== currentUser.id
                    ? message.sender.name
                    : ""}
                <time datetime="" className="text-xs opacity-50 ml-2">
                    {formatMessageDateLong(message.created_at)}
                </time>
            </div>
            <div
                className={
                    "chat-bubble relative" +
                    (message.sender_id === currentUser.id
                        ? " chat-bubble-info"
                        : "")
                }
            >
                <div className="chat-message">
                    <div className="chat-message-content">
                        <ReactMarkdown>{message.message}</ReactMarkdown>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default MessageItem;