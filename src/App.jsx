import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import Board from "./Board";

export default function App() {
  const [difficulty, setDifficulty] = useState("medium"); 
  const [image,setimageurl] = useState("");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage setDifficulty={setDifficulty} setimageurl={setimageurl} />} />
          <Route path="/game" element={<Board difficulty={difficulty} imageurl={image} />} />
        </Routes>
      </div>
    </Router>
  );
}
