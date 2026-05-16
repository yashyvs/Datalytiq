"use client";

import { useState } from "react";
import UploadBox from "@/components/UploadBox";
import SummaryPanel from "@/components/SummaryPanel";
import GraphPanel from "@/components/GraphPanel";
import ChatPanel from "@/components/ChatPanel";
import InsightPanel from "@/components/InsightPanel";
import api from "@/services/api";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setData(null);
    setSessionId(null);

    try {
      const response = await api.post("/upload", formData);
      setData(response.data);
      setSessionId(response.data.session_id);
    } catch (error: any) {
      const msg =
        error?.response?.data?.detail || "Upload failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setData(null);
    setSessionId(null);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-5xl font-bold">Datalytiq</h1>
          {data && (
            <button
              onClick={handleReset}
              className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-xl transition-all"
            >
              ↑ Upload new file
            </button>
          )}
        </div>

        <p className="text-zinc-400 mb-8">
          Upload, visualize and chat with your data
        </p>

        {!data && <UploadBox onUpload={handleUpload} loading={loading} />}

        {data && (
          <div className="grid grid-cols-12 gap-6 mt-8">
            {/* LEFT SIDE */}
            <div className="col-span-9 space-y-6">
              <SummaryPanel data={data.summary} />
              <InsightPanel insights={data.insights} />
              <GraphPanel graph={data.graph} />
            </div>

            {/* RIGHT SIDE */}
            <div className="col-span-3 sticky top-4 self-start">
              <ChatPanel sessionId={sessionId!} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
