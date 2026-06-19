import { useState } from "react";
import api from "../services/api";

function Chat() {

    const [message, setMessage] =
        useState("");

    const [chat, setChat] =
        useState([]);

    const sendMessage = async () => {

        if (!message.trim())
            return;

        const userMsg = {
            role: "user",
            text: message
        };

        setChat(prev => [
            ...prev,
            userMsg
        ]);

        const token = localStorage.getItem("token");

const res = await api.post(
    "/chat/",
    {
        message
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

        const aiMsg = {
            role: "ai",
            text: res.data.response
        };

        setChat(prev => [
            ...prev,
            aiMsg
        ]);

        setMessage("");
    };

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-4">
                Enterprise AI Assistant
            </h1>

            <div className="border h-[500px] overflow-auto p-4 rounded">

                {chat.map((msg, index) => (

                    <div
                        key={index}
                        className={
                            msg.role === "user"
                                ? "text-right mb-4"
                                : "text-left mb-4"
                        }
                    >

                        <span
                            className={
                                msg.role === "user"
                                    ? "bg-blue-500 text-white p-2 rounded"
                                    : "bg-gray-200 p-2 rounded"
                            }
                        >

                            {msg.text}

                        </span>

                    </div>

                ))}

            </div>

            <div className="flex mt-4 gap-2">

                <input
                    className="border p-2 flex-1"
                    value={message}
                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-4 py-2"
                >
                    Send
                </button>

            </div>

        </div>
    );
}

export default Chat;