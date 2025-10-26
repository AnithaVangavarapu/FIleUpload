import { useFileList } from "./useFIleList";
import { Download } from "lucide-react";

const FileList = () => {
  const { files, columns } = useFileList();

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
              <a href={f.file_url} download={f.file_name}>
                <Download />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileList;
