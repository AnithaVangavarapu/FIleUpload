import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

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
      setStatus("success");
    } catch (error) {
      console.log("Error while uploading file:", error);
      setStatus("error");
    }
  }, []);

  return { control, errors, status, handleSubmit, onSubmit };
};
