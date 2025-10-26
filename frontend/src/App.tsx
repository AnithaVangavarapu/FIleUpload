import { ToastContainer } from "react-toastify";
import { FileUploadForm } from "./components/pages/FileUploadForm";
import { FileList } from "./components/pages/FileList";

function App() {
  return (
    <div className="m-5 flex justify-center flex-col gap-2">
      <FileUploadForm />
      <FileList />
      <ToastContainer />
    </div>
  );
}

export default App;
