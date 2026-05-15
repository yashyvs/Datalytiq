"use client";

import { useState } from "react";
import SummaryPanel from "@/components/SummaryPanel";
import UploadBox from "@/components/UploadBox";
import api from "@/services/api";
import GraphPanel from "@/components/GraphPanel"

export default function Home() {
  const [data, setData] = useState(null);

  async function handleUpload(file: any) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/upload", formData);

    setData(response.data);
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Datalytiq</h1>

      <UploadBox onUpload={handleUpload} />

      {data && (
        <div className="mt-10">
          <h2 className="font-bold">Dataset Summary</h2>

          <SummaryPanel data={data.summary} />
          <GraphPanel
            graph={data.graph}
/>
        </div>
      )}
    </div>
  );
}
