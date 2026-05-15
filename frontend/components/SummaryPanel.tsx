type Props = {
  data: any;
};

export default function SummaryPanel({ data }: Props) {
  return (
    <div
      className="
mt-10
rounded-2xl
border
border-zinc-700
bg-zinc-900
p-6
text-white
space-y-6
"
    >
      <h2 className="text-2xl font-bold">Dataset Summary</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-800 rounded-xl p-4">
          <p className="text-gray-400">Rows</p>

          <h3 className="text-2xl font-bold">{data.rows}</h3>
        </div>

        <div className="bg-zinc-800 rounded-xl p-4">
          <p className="text-gray-400">Columns</p>

          <h3 className="text-2xl font-bold">{data.columns}</h3>
        </div>

        <div className="bg-zinc-800 rounded-xl p-4">
          <p className="text-gray-400">Duplicates</p>

          <h3 className="text-2xl font-bold">{data.duplicate_rows}</h3>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Column Names</h3>

        <div className="flex flex-wrap gap-2">
          {data.column_names.map((col: string) => (
            <div
              key={col}
              className="
bg-blue-600
px-4
py-2
rounded-full
"
            >
              {col}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Missing Values</h3>

        <pre
          className="
bg-zinc-800
p-4
rounded
overflow-auto
text-sm
"
        >
          {JSON.stringify(data.missing_values, null, 2)}
        </pre>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Preview</h3>

        <pre
          className="
bg-zinc-800
p-4
rounded
overflow-auto
text-sm
"
        >
          {JSON.stringify(data.preview, null, 2)}
        </pre>
      </div>
    </div>
  );
}
