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

    // clear immediately
    setQuestion("");

    const userMessage = {
      role: "user",

      text: currentQuestion,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await api.post(
        "/chat",

        {
          question: currentQuestion,
        },
      );

      const botMessage = {
        role: "assistant",

        text: response.data.answer,
      };

      setMessages((prev) => [...prev, botMessage]);
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

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div
      className="
mt-10
bg-zinc-900
border
border-zinc-700
rounded-2xl
p-6
text-white
"
    >
      <h2
        className="
text-2xl
font-bold
mb-6
"
      >
        Talk to Dataset
      </h2>

      <div
        className="
h-80
overflow-y-auto
space-y-4
mb-4
"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`

p-3
rounded-xl
max-w-[80%]

${msg.role === "user" ? "bg-blue-600 ml-auto" : "bg-zinc-800"}

`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div
            className="
bg-zinc-800
p-3
rounded-xl
w-fit
"
          >
            Thinking...
          </div>
        )}
      </div>

      <div
        className="
flex
gap-2
"
      >
        <input
          value={question}
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="
Ask about your file...
"
          className="
flex-1
bg-zinc-800
rounded-xl
p-3
outline-none
"
        />

        <button
          onClick={sendMessage}
          className="
bg-blue-600
px-5
rounded-xl
"
        >
          Send
        </button>
      </div>
    </div>
  );
}
