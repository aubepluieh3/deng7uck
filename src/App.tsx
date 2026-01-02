import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllMessagesPage from "./pages/AllMessagesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/messages" element={<AllMessagesPage messages={[]} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;