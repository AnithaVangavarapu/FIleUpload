import React, { useCallback, useRef, useState, type ChangeEvent } from "react";
import { Upload } from "lucide-react";
interface FileUploadProps {
  label?: string;
  accept?: string;
  name: string;
  error?: string;
  onChange: (val: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  error,
  accept = "images/*",
  onChange,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    } else {
      onChange(null);
    }
  }, []);

  return (
    <div className="flex flex-col w-full gap-2">
      <input
        name={name}
        type="file"
        ref={ref}
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      {label && <label>{label}</label>}

      <div
        onClick={() => ref.current?.click()}
        className="border flex justify-center p-2 rounded-lg"
      >
        <Upload size={20} />
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
