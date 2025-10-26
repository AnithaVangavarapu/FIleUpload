import { useFileList } from "./useFIleList";
import { Download } from "lucide-react";

const FileList = () => {
  const { files, columns, handleDownload } = useFileList();

  return (
    <table className="border">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {files.map((f) => (
          <tr key={f.id}>
            {columns.map((c: { key: string; label: string }) => (
              <td key={c.key} className="text-center">
                {f[c.key as keyof typeof f]}
              </td>
            ))}
            <td>
              <Download onClick={() => handleDownload(f.id, f.file_name)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileList;
