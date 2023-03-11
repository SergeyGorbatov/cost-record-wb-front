import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Cost from "./components/Cost";
import Income from "./components/Income";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/cost" element={<Cost />} />
      <Route path="/income" element={<Income />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
