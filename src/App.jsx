import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reveal from "./pages/Reveal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reveal" element={<Reveal />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
