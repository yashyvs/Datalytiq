"use client";

import { useState } from "react";

type Props = {
  data: any;
};

export default function SummaryPanel({ data }: Props) {
  const [openSection, setOpenSection] = useState("");

  function toggle(section: string) {
    setOpenSection(openSection === section ? "" : section);
  }

  const totalMissing = Object.values(data.missing_values).reduce(
    (a: any, b: any) => a + b,
    0,
  );

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-xl">
      <h1 className="text-2xl font-bold text-white mb-6">Dataset Overview</h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card title="Rows" value={data.rows} />

        <Card title="Columns" value={data.columns} />

        <Card title="Missing" value={totalMissing} />

        <Card title="Duplicates" value={data.duplicate_rows} />
      </div>

      <h3 className="text-white font-semibold mb-3">Columns</h3>

      <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto mb-6">
        {data.column_names.map((col: string) => (
          <span
            key={col}
            className="
                px-3
                py-1
                rounded-full
                bg-zinc-800
                text-sm
                text-zinc-300
              "
          >
            {col}
          </span>
        ))}
      </div>

      <AccordionButton
        title="Dataset Preview"
        onClick={() => toggle("preview")}
      />

      {openSection === "preview" && (
        <div className="mt-3 mb-3 bg-zinc-900 rounded-2xl p-4 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {data.column_names.slice(0, 5).map((col: string) => (
                  <th key={col} className="text-left pb-3 text-zinc-400">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.preview.map((row: any, i: number) => (
                <tr key={i}>
                  {data.column_names.slice(0, 5).map((col: string) => (
                    <td key={col} className="py-2 text-zinc-300">
                      {String(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AccordionButton
        title="Missing Values"
        onClick={() => toggle("missing")}
      />

      {openSection === "missing" && (
        <div className="mt-3 bg-zinc-900 rounded-2xl p-4 max-h-64 overflow-y-auto">
          {Object.entries(data.missing_values).map(([k, v]: any) => (
            <div
              key={k}
              className="flex justify-between py-2 border-b border-zinc-800 text-zinc-300"
            >
              <span>{k}</span>

              <span>{String(v)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-5">
      <p className="text-zinc-400 text-sm">{title}</p>

      <h2 className="text-white text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function AccordionButton({ title, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        bg-zinc-900
        hover:bg-zinc-800
        rounded-2xl
        p-4
        text-left
        text-white
        mb-3
      "
    >
      {title}
    </button>
  );
}
