type Props = {
  data: any;
};

export default function SummaryPanel({ data }: Props) {
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
      space-y-8
      "
    >
      <h2 className="text-2xl font-bold">Dataset Summary</h2>

      {/* Stats cards */}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-zinc-800 p-5 rounded-xl">
          <p className="text-gray-400">Rows</p>

          <h1 className="text-3xl font-bold">{data.rows}</h1>
        </div>

        <div className="bg-zinc-800 p-5 rounded-xl">
          <p className="text-gray-400">Columns</p>

          <h1 className="text-3xl font-bold">{data.columns}</h1>
        </div>

        <div className="bg-zinc-800 p-5 rounded-xl">
          <p className="text-gray-400">Duplicate Rows</p>

          <h1 className="text-3xl font-bold">{data.duplicate_rows}</h1>
        </div>
      </div>

      {/* columns */}

      <div>
        <h3
          className="
          font-bold
          mb-4
          "
        >
          Columns
        </h3>

        <div
          className="
          max-h-32
          overflow-y-auto
          flex
          flex-wrap
          gap-2
          p-2
          bg-zinc-800
          rounded-xl
          "
        >
          {data.column_names.map((col: string) => (
            <span
              key={col}
              className="
                  px-3
                  py-1
                  rounded-full
                  bg-blue-600
                  text-sm
                  "
            >
              {col}
            </span>
          ))}
        </div>
      </div>

      {/* Missing values */}

      <div>
        <h3 className="font-bold mb-3">Missing Values</h3>

        <div className="bg-zinc-800 rounded-xl p-4">
          {Object.entries(data.missing_values).map(([key, value]: any) => (
            <div
              key={key}
              className="
flex
justify-between
border-b
border-zinc-700
py-2
"
            >
              <span>{key}</span>

              <span>{String(value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}

      <div>
        <h3
          className="
font-bold
mb-4
"
        >
          Preview
        </h3>

        <div
          className="
overflow-auto
rounded-xl
"
        >
          <table
            className="
w-full
bg-zinc-800
"
          >
            <thead>
              <tr>
                {data.column_names.slice(0, 5).map((col: string) => (
                  <th
                    key={col}
                    className="
p-3
text-left
border-b
border-zinc-700
"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.preview.map((row: any, i: number) => (
                <tr key={i}>
                  {data.column_names.slice(0, 5).map((col: string) => (
                    <td
                      key={col}
                      className="
p-3
border-b
border-zinc-700
"
                    >
                      {String(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
