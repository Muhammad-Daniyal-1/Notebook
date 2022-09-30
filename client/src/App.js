import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
 
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home  />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login /> } />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
