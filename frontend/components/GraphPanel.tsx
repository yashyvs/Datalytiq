"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

type Props = {
  graph: any;
};

export default function GraphPanel({ graph }: Props) {
  if (!graph) {
    return null;
  }

  const parsedGraph = JSON.parse(graph);

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
        Auto Generated Graph
      </h2>

      <Plot
        data={parsedGraph.data}
        layout={{
          ...parsedGraph.layout,

          autosize: true,

          paper_bgcolor: "#18181b",

          plot_bgcolor: "#18181b",

          font: {
            color: "white",
          },
        }}
        style={{
          width: "100%",
          height: "500px",
        }}
      />
    </div>
  );
}
