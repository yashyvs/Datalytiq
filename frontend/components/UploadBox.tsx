"use client";

import { useDropzone } from "react-dropzone";

export default function UploadBox({
  onUpload,
}: {
  onUpload: (file: File) => void;
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [".csv"],

      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },

    onDrop: (files) => {
      onUpload(files[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className="
border-2
border-dashed
rounded-xl
p-16
text-center
cursor-pointer
"
    >
      <input {...getInputProps()} />

      <p>Drop CSV/XLSX here</p>
    </div>
  );
}
