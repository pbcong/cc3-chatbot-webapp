import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [question, setQuestion] = useState("");

  const handleQuery = () => {
    if (!question.trim()) return; // Prevent empty submissions
    onSend(question);
    setQuestion("");
  };

  return (
    <div className="p-4 bg-white shadow-md flex items-center space-x-2">
      <textarea
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleQuery();
          }
        }}
        rows={2}
      ></textarea>
      <button
        onClick={handleQuery}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
