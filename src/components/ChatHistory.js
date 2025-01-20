import React, { useEffect, useRef } from "react";

const ChatHistory = ({ chatHistory }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex flex-col space-y-3 w-full px-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex flex-col p-3 rounded-lg ${
              chat.type === "question"
                ? "bg-blue-100 text-blue-800 ml-auto"
                : chat.type === "answer"
                ? "bg-green-100 text-green-800 mr-auto"
                : "bg-rose-100 text-rose-800 mr-auto border border-rose-200"
            }`}
          >
            <div className="break-words">{chat.text}</div>
            <div className="text-xs text-gray-500 mt-1 text-right">
              {formatTimestamp(chat.timestamp)}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatHistory;
