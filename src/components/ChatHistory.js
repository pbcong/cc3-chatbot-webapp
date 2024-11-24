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
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {chatHistory.map((chat, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg ${
            chat.type === "question"
              ? "bg-blue-100 text-blue-800 self-end"
              : chat.type === "answer"
              ? "bg-green-100 text-green-800 self-start"
              : "bg-red-100 text-red-800 self-start"
          }`}
        >
          <div>{chat.text}</div>
          <div className="text-sm text-gray-500 mt-1">
            {formatTimestamp(chat.timestamp)}
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatHistory;
