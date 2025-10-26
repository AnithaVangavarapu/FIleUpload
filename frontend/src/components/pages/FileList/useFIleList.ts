import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface FileProp {
  id: number;
  file_name: string;
  file_type: string;
  date_time: string;
}

const columns = [
  {
    key: "id",
    label: "Id",
  },
  {
    key: "file_name",
    label: "Name",
  },
  {
    key: "file_type",
    label: "Type",
  },
  {
    key: "date_time",
    label: "Date&Time",
  },
];

export const useFileList = () => {
  const [files, setFiles] = useState<FileProp[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get<FileProp[]>("http://localhost:5000/api/file");
      setFiles(res.data);
    } catch (error) {
      console.log("Error while fetching files:", error);
      setFiles([]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownload = async (id: number, fileName: string) => {
    const response = await fetch(
      `http://localhost:5000/api/file/download/${id}`
    );
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return { files, columns, handleDownload };
};
