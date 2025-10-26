import { useFileUploadForm } from "./useFileUploadForm";
import { Controller } from "react-hook-form";
import { FileUpload } from "../../shared/FileUpload";
import { cn } from "../../../utils/cn";

const Form = () => {
  const { control, errors, status, onSubmit, handleSubmit } =
    useFileUploadForm();
  return (
    <div className="flex flex-col w-[50%] gap-4 p-2">
      <Controller
        name="inputFile"
        control={control}
        rules={{
          required: "Select file before submitting",
          validate: (val) =>
            val.size < 10 * 1024 * 1024 || "Max file size 10MB",
        }}
        render={({ field }) => (
          <FileUpload
            name={field.name}
            onChange={field.onChange}
            label="Upload File :"
            error={errors.inputFile?.message as string}
          />
        )}
      />
      <button
        onClick={handleSubmit(onSubmit)}
        type="submit"
        className={cn(
          "cursor-pointer border p-1 rounded-lg",
          status === "uploading" && "pointer-events-none"
        )}
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
