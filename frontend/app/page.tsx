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

  const [loading, setLoading] = useState(false);

  async function handleUpload(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    setLoading(true);

    try {
      const response = await api.post("/upload", formData);

      setData(response.data);
    } catch (error) {
      console.log(error);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      p-6
      "
    >
      <div
        className="
        max-w-[1600px]
        mx-auto
        "
      >
        <h1
          className="
          text-5xl
          font-bold
          mb-2
          "
        >
          Datalytiq
        </h1>

        <p
          className="
          text-zinc-400
          mb-8
          "
        >
          Upload, visualize and chat with your data
        </p>

        <UploadBox onUpload={handleUpload} loading={loading} />

        {data && (
          <div
            className="
              grid
              grid-cols-12
              gap-6
              mt-8
              "
          >
            {/* LEFT SIDE */}

            <div
              className="
                col-span-9
                space-y-6
                "
            >
              <SummaryPanel data={data.summary} />

              <InsightPanel insights={data.insights} />

              <GraphPanel graph={data.graph} />
            </div>

            {/* RIGHT SIDE */}

            <div
              className="
                col-span-3
                sticky
                top-4
                self-start
                "
            >
              <ChatPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
