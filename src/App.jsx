import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import Board from "./Board";

export default function App() {
  const [difficulty, setDifficulty] = useState("medium"); 
  const [image,setimageurl] = useState("");
  const [timerEnabled,setTimerEnabled]=useState("false");
    const [timerDuration,setTimerDuration]=useState("60");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage setDifficulty={setDifficulty} setimageurl={setimageurl} setTimer={setTimerDuration} Enable={setTimerEnabled}/>} />
          <Route path="/game" element={<Board difficulty={difficulty} imageurl={image}  timerDuration={timerDuration} timerEnabled={timerEnabled} />} />
        </Routes>
      </div>
    </Router>
  );
}
