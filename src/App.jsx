// src/App.jsx
import React, { useState } from "react";
import axios from "axios";
import ChatHistory from "./components/ChatHistory";
import MessageInput from "./components/MessageInput";

export default function App() {
  const [chatHistory, setChatHistory] = useState([]); // Chat history (questions and answers)

  // Function to handle the API query
  const handleQuery = async (question) => {
    // Add the user's question to the chat history
    const userMessage = {
      type: "question",
      text: question,
      timestamp: new Date(),
    };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:8000/query", {
        question,
      });
      // Add the AI's response to the chat history
      const botMessage = {
        type: "answer",
        text: response.data.answer,
        timestamp: new Date(),
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error querying backend:", error);

      // Add an error message to the chat history
      const errorMessage = {
        type: "error",
        text: "Error retrieving response.",
        timestamp: new Date(),
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="text-5xl text-center font-mono mt-4 font-bold">
        Ask me anything about CC0003!
      </div>
      <ChatHistory chatHistory={chatHistory} />
      <MessageInput onSend={handleQuery} />
    </div>
  );
}
