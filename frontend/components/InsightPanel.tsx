type Props = {
  insights: string[];
};

export default function InsightPanel({ insights }: Props) {
  return (
    <div
      className="
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
mb-5
"
      >
        AI Insights
      </h2>

      <div
        className="
space-y-3
"
      >
        {insights.map((item, i) => (
          <div
            key={i}
            className="
bg-zinc-800
rounded-xl
p-4
"
          >
            ✨ {item}
          </div>
        ))}
      </div>
    </div>
  );
}
