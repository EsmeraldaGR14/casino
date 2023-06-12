import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import Home from "./components/Home/Home";
import Casino from "./components/Casino/Casino";

function App() {
  //
  return (
    <div className="app-container">
      <Router>
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/casino" element={<Casino />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
