import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Team from "./pages/Team";
import EventPage from "./pages/Events";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"     element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<EventPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;