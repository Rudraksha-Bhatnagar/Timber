import React, {useState,useEffect} from "react";
import Board from "./Board";
import { div } from "motion/react-client";
import { updateURLParameter } from "./helpers";
export default function App(){
  const [imageurl,setimage]=useState("");
  useEffect(()=>{
    const urlParams=new URLSearchParams(window.location.search)
    if(urlParams.has("img")){
      setimage(urlParams.get("img"));
    }
  },[])
  const handleImageChange=(e)=>{
    setimage(e.target.value)
    window.history.replaceState("","",updateURLParameter(window.location.href,"img",e.target.value))
  }
  return (
    <div className="App">
      <h1>React Sliding puzzle</h1>
      <Board imgurl={imageurl} />
      <input value={imageurl} onChange={handleImageChange} />

    </div>
  )
}