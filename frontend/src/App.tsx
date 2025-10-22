import { ToastContainer } from "react-toastify";
import { FileUploadForm } from "./components/pages/FileUploadForm";

function App() {
  return (
    <div className="m-5">
      <FileUploadForm />
      <ToastContainer />
    </div>
  );
}

export default App;
