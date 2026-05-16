"use client";

import { useState } from "react";
import api from "@/services/api";

export default function ChatPanel() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!question.trim() || loading) return;

    const currentQuestion = question;

    setQuestion("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentQuestion,
      },
    ]);

    setLoading(true);

    try {
      const response = await api.post("/chat", {
        question: currentQuestion,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response.data.answer,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong",
        },
      ]);
    }

    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl h-[88vh] flex flex-col shadow-2xl">
      <div className="p-5 border-b border-zinc-800">
        <h2 className="text-xl font-semibold text-white">Ask Dataset</h2>

        <p className="text-sm text-zinc-400 mt-1">
          Ask anything about uploaded data
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl p-3 text-sm ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-100"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bg-zinc-800 w-fit p-3 rounded-2xl text-sm">
            Thinking...
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-2">
          <input
            value={question}
            onKeyDown={handleKeyDown}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about dataset..."
            className="
              flex-1
              bg-zinc-900
              border
              border-zinc-700
              rounded-xl
              px-4
              py-3
              outline-none
              text-white
            "
          />

          <button
            onClick={sendMessage}
            className="
              shrink-0
              bg-blue-600
              hover:bg-blue-700
              px-2
              py-3
              rounded-xl
              text-white
            "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
