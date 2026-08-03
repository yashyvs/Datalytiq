"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

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
        session_id: sessionId,
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
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl h-[88vh] flex flex-col shadow-2xl">

      {/* Header */}

      <div className="p-5 border-b border-zinc-800">

        <h2 className="text-xl font-semibold text-white">
          Ask Dataset
        </h2>

        <p className="text-sm text-zinc-400 mt-1">
          Ask anything about your uploaded dataset
        </p>

      </div>

      {/* Chat */}

      <div className="flex-1 overflow-y-auto p-4 space-y-5">

        {messages.length === 0 && (
          <div className="text-center text-zinc-500 mt-8 text-sm">

            Try asking:

            <div className="mt-3 space-y-2">

              <div>• Summarize this dataset</div>

              <div>• What are the missing values?</div>

              <div>• Which ML model is suitable?</div>

            </div>

          </div>
        )}

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`max-w-[90%] rounded-2xl px-4 py-3 ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "bg-zinc-900 border border-zinc-800 text-zinc-200"
            }`}
          >

            {msg.role === "assistant" ? (

              <article className="prose prose-invert prose-sm max-w-none">

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {msg.text}
                </ReactMarkdown>

              </article>

            ) : (

              <p>{msg.text}</p>

            )}

          </div>

        ))}

        {loading && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 w-fit">

            <div className="flex items-center gap-3">

              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>

              <span className="text-zinc-400">
                Datalytiq AI is thinking...
              </span>

            </div>

          </div>

        )}

        <div ref={bottomRef} />

      </div>

      {/* Input */}

      <div className="border-t border-zinc-800 p-4">

        <div className="flex items-center gap-2">

          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your dataset..."
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
              placeholder:text-zinc-500
              disabled:opacity-50
            "
          />

          <button
            onClick={sendMessage}
            disabled={loading || !question.trim()}
            className="
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-blue-900
              disabled:cursor-not-allowed
              text-white
              px-5
              py-3
              rounded-xl
              transition
            "
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}