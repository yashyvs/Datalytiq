"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

type Props = {
  graph: any[];
};

export default function GraphPanel({ graph }: Props) {
  if (!graph || graph.length === 0) return null;

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Visual Insights</h2>

      <div className="grid grid-cols-2 gap-6">
        {graph.map((g: any, i: number) => {
          const parsed = JSON.parse(g);

          return (
            <div
              key={i}
              className="
                  bg-zinc-900
                  rounded-2xl
                  p-3
                "
            >
              <Plot
                data={parsed.data}
                layout={{
                  ...parsed.layout,
                  paper_bgcolor: "#18181b",
                  plot_bgcolor: "#18181b",
                  font: {
                    color: "white",
                  },
                  autosize: true,
                }}
                style={{
                  width: "100%",
                  height: "400px",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
