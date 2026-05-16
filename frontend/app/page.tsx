"use client";

import { useState } from "react";
import SummaryPanel from "@/components/SummaryPanel";
import UploadBox from "@/components/UploadBox";
import api from "@/services/api";
import GraphPanel from "@/components/GraphPanel"
import ChatPanel from "@/components/ChatPanel";
import InsightPanel from "@/components/InsightPanel";

export default function Home() {
  const [data, setData] = useState(null);

  async function handleUpload(file: any) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/upload", formData);

    setData(response.data);
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
      <h1
        className="
text-4xl
font-bold
mb-8
"
      >
        Datalytiq
      </h1>

      <UploadBox onUpload={handleUpload} />

      {data && (
        <div
          className="
grid
grid-cols-12
gap-6
mt-8
"
        >
          {/* LEFT */}

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

          {/* RIGHT */}

          <div
            className="
col-span-3
sticky
top-4
self-start
h-[90vh]
"
          >
            <ChatPanel />
          </div>
        </div>
      )}
    </div>
  );
}
