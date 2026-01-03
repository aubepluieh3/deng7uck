import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllMessagesPage from "./pages/AllMessagesPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/messages" element={<AllMessagesPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
