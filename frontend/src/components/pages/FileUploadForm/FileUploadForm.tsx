import { useFileUploadForm } from "./useFileUploadForm";
import { Controller } from "react-hook-form";
import { FileUpload } from "../../shared/FileUpload";
import { cn } from "../../../utils/cn";

const Form = () => {
  const { control, errors, status, onSubmit, handleSubmit } =
    useFileUploadForm();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[50%] gap-2 border p-2">
        <Controller
          name="inputFile"
          control={control}
          rules={{
            validate: (val) =>
              val.size < 10 * 1024 * 1024 || "Max file size 10MB",
          }}
          render={({ field }) => (
            <FileUpload
              name={field.name}
              onChange={field.onChange}
              label="Browse"
              error={errors.inputFile?.message as string}
            />
          )}
        />
        <button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          className={cn(
            "cursor-pointer border px-1",
            status === "uploading" && "pointer-events-none"
          )}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
