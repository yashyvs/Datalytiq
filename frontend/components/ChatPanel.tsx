"use client";

import { useState, useRef, useEffect } from "react";
import api from "@/services/api";

type Message = {
  role: "user" | "assistant";
  text: string;
};

type Props = {
  sessionId: string;
};

export default function ChatPanel({ sessionId }: Props) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!question.trim() || loading) return;

    const currentQuestion = question;
    setQuestion("");

    setMessages((prev) => [...prev, { role: "user", text: currentQuestion }]);

    setLoading(true);

    try {
      const response = await api.post("/chat", {
        session_id: sessionId,
        question: currentQuestion,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: response.data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl h-[88vh] flex flex-col shadow-2xl">
      <div className="p-5 border-b border-zinc-800">
        <h2 className="text-xl font-semibold text-white">Ask Dataset</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Ask anything about your uploaded data
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-zinc-600 text-sm text-center mt-8">
            Ask a question to get started
          </p>
        )}

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
          <div className="bg-zinc-800 w-fit p-3 rounded-2xl text-sm text-zinc-400">
            Thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-2">
          <input
            value={question}
            onKeyDown={handleKeyDown}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about dataset..."
            disabled={loading}
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
              disabled:opacity-50
            "
          />
          <button
            onClick={sendMessage}
            disabled={loading || !question.trim()}
            className="
              shrink-0
              bg-blue-600
              hover:bg-blue-700
              disabled:opacity-50
              disabled:cursor-not-allowed
              px-2
              py-3
              rounded-xl
              text-white
              transition-colors
            "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
