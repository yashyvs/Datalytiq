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
    (a: any, b: any) => Number(a) + Number(b),
    0,
  );

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl shadow-xl">
      {/* Header */}

      <div className="border-b border-zinc-800 p-6">
        <h1 className="text-3xl font-bold text-white">Dataset Overview</h1>

        <p className="text-zinc-400 mt-2">
          AI generated summary of your uploaded dataset.
        </p>
      </div>

      {/* AI Description */}

      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-950 to-zinc-900 border border-blue-900 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">🤖</div>

            <h2 className="text-xl font-semibold text-white">
              Dataset Description
            </h2>
          </div>

          <p className="text-zinc-300 leading-7">{data.dataset_description}</p>
        </div>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-5 px-6 pb-6">
        <Card title="Rows" value={data.rows} />

        <Card title="Columns" value={data.columns} />

        <Card title="Missing" value={totalMissing} />

        <Card title="Duplicates" value={data.duplicate_rows} />
      </div>

      {/* Columns */}

      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Dataset Columns
        </h2>

        <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
          {data.column_names.map((col: string) => (
            <span
              key={col}
              className="
                  bg-zinc-900
                  border
                  border-zinc-700
                  px-3
                  py-2
                  rounded-full
                  text-sm
                  text-zinc-300
                "
            >
              {col}
            </span>
          ))}
        </div>
      </div>

      {/* Accordion */}

      <div className="px-6 pb-6 space-y-3">
        <AccordionButton
          title="Dataset Preview"
          onClick={() => toggle("preview")}
        />

        {openSection === "preview" && (
          <div className="bg-zinc-900 rounded-2xl p-4 overflow-auto">
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
                {data.preview.map((row: any, index: number) => (
                  <tr key={index}>
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
          <div className="bg-zinc-900 rounded-2xl max-h-72 overflow-y-auto">
            {Object.entries(data.missing_values).map(([key, value]: any) => (
              <div
                key={key}
                className="
                    flex
                    justify-between
                    px-5
                    py-3
                    border-b
                    border-zinc-800
                  "
              >
                <span className="text-zinc-300">{key}</span>

                <span className="text-blue-400 font-medium">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
      <p className="text-zinc-400 text-sm">{title}</p>

      <h2 className="text-white text-3xl font-bold mt-3">{value}</h2>
    </div>
  );
}

function AccordionButton({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        bg-zinc-900
        border
        border-zinc-800
        hover:border-blue-600
        rounded-2xl
        px-5
        py-4
        text-left
        text-white
        transition
      "
    >
      {title}
    </button>
  );
}
