import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full max-w-full bg-[#FFFCF0] flex flex-col overflow-hidden">
        <NavBar />
        <main className="flex-1 flex flex-col items-center justify-start w-full max-w-full overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculation" element={<MainPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
