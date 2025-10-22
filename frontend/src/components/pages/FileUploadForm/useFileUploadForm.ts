import axios from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormProps {
  inputFile: File;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export const useFileUploadForm = () => {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit = useCallback(async () => {
    setStatus("uploading");
    const fileData = new FormData();
    fileData.append("file", getValues("inputFile"));
    try {
      await axios.post("http://localhost:5000/api/file", fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setStatus("success");
      toast.success("Uploaded!");
    } catch (error: any) {
      console.log("Error while uploading file:", error);
      setStatus("error");
      toast.error(error?.response?.data?.message || "Upload failed");
    }
  }, []);

  return { control, errors, status, handleSubmit, onSubmit };
};
