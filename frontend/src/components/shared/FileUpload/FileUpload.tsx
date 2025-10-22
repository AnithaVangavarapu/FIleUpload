import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { Upload, X } from "lucide-react";
import { cn } from "../../../utils/cn";
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
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onChange(e.target.files[0]);
        setFile(e.target.files[0]);
      } else {
        onChange(null);
        setFile(null);
      }
    },
    [onChange, file]
  );

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

      {file ? (
        <div className="flex justify-between border p-2 rounded-lg">
          <p>{file.name}</p>
          <X
            onClick={() => {
              setFile(null);
              onChange(null);
              if (ref.current) {
                ref.current.value = "";
              }
            }}
          />
        </div>
      ) : (
        <div
          onClick={() => ref.current?.click()}
          className={cn("border p-2 rounded-lg flex justify-center")}
        >
          <Upload size={20} />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
