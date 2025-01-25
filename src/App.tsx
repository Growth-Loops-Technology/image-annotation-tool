import { Route, Routes } from "react-router";
import AnnotationTool from "./pages/AnnotationTool";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AnnotationTool />} />
      </Routes>
    </div>
  );
}

export default App;
