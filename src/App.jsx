import React, {useState,useEffect} from "react";
import Board from "./Board";
import { div } from "motion/react-client";
import { updateURLParameter } from "./helpers";
export default function App(){
  
  return (
    <div className="App">
      <h1>React Sliding puzzle</h1>
      <Board />
      
    </div>
  )
}