"use client";

import { useDropzone } from "react-dropzone";

type Props = {
  onUpload: (file: File) => void;
  loading?: boolean;
};

export default function UploadBox({ onUpload, loading = false }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],

      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },

    multiple: false,

    onDrop: (files) => {
      if (files.length > 0) {
        onUpload(files[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`

      border-2
      border-dashed
      rounded-3xl
      p-12
      text-center
      cursor-pointer
      transition-all
      bg-zinc-950

      ${isDragActive ? "border-blue-500 scale-[1.01]" : "border-zinc-700"}

      `}
    >
      <input {...getInputProps()} />

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">Upload Dataset</h2>

        <p className="text-zinc-400">Drag & drop CSV/XLSX</p>

        {loading ? (
          <div className="space-y-3">
            <div
              className="
              w-8
              h-8
              border-4
              border-blue-500
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              "
            />

            <p className="text-blue-400">Analyzing Dataset...</p>
          </div>
        ) : (
          <button
            className="
            bg-blue-600
            px-5
            py-2
            rounded-xl
            text-white
            hover:bg-blue-700
            "
          >
            Choose File
          </button>
        )}
      </div>
    </div>
  );
}
