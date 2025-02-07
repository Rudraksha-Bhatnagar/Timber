import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRandomImage } from "./fetchimage";
import { image } from "motion/react-client";
import "./homepage.css";
function HomePage({ setDifficulty,setimageurl }) {
    const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
    const navigate = useNavigate();
    const[imageurl,setimage]=useState("");
    async function getnewimage(){
        const img=await fetchRandomImage();
        setimage(img);
    }
    useEffect(()=>{
        getnewimage();
    },[])
    const handleStart = () => {
        setimageurl(imageurl);
        setDifficulty(selectedDifficulty);
        navigate("/game");
    };

    return (
        <div className="homepage">
            <h1>Sliding Puzzle Game</h1>
            <div className="preview-container">
                <h3>Preview Image</h3>
                <img
                    src={imageurl}
                    alt="Puzzle Preview"
                    style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "10px" }}
                />
                <button onClick={getnewimage}>🔄 Change Image</button>
            </div>
            <label>Select Difficulty:</label>
            <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
                <option value="easy">Easy (3x3)</option>
                <option value="medium">Medium (4x4)</option>
                <option value="hard">Hard (5x5)</option>
            </select>
            <button onClick={handleStart}>Start Game</button>
        </div>
    );
}

export default HomePage;
