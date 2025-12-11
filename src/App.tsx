import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PhotoDetails from "./components/PhotoDetails";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo/:id" element={<PhotoDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
