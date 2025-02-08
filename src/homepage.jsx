import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRandomImage } from "./fetchimage";
import "./homepage.css";
function HomePage({ setDifficulty, setimageurl, setTimer, Enable }) {
    const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
    const [timerEnabled, setTimerEnabled] = useState("false");
    const [timerDuration, setTimerDuration] = useState("60");
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const [imageurl, setimage] = useState("");
    const startGame = () => {
        setShowDialog(true); // Show the dialog box
        setimageurl(imageurl)
    };

    const confirmGameStart = () => {
        setShowDialog(false);
        
        setimageurl(imageurl);
        setDifficulty(selectedDifficulty);
        setTimer(timerDuration);
        Enable(timerEnabled);
        navigate("/game");

    };
    async function getnewimage() {
        const img = await fetchRandomImage();
        setimage(img);
    }
    useEffect(() => {
        getnewimage();
    }, [])
    const handleStart = () => {
        setimageurl(imageurl);
        setDifficulty(selectedDifficulty);
        setTimer(timerDuration);
        Enable(timerEnabled);
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
                <button onClick={getnewimage} className="change-image-btn">Change Image</button>
            </div>
            <button onClick={startGame}>Start Game</button>

            {/* Dialog Box */}
            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <h2>Game Settings</h2>

                        {/* Difficulty Selection */}
                        <table  className="table">
                            <tr>
                                <td>
                                    <label>Select Difficulty:</label>

                                </td>
                                <td>
                                    <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value) } className="difficulty-slider">
                                        <option value="easy">Easy (3x3)</option>
                                        <option value="medium">Medium (4x4)</option>
                                        <option value="hard">Hard (5x5)</option>
                                    </select>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Enable Timer?</label>

                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={timerEnabled}
                                        onChange={(e) => setTimerEnabled(e.target.checked)}
                                    />

                                </td>
                            </tr>
                            {timerEnabled && (
                                <>
                                    <tr>
                                        <td>

                                            <label>Set Timer:</label>
                                        </td>
                                        <td>
                                            <select value={timerDuration} onChange={(e) => setTimerDuration(Number(e.target.value))} className="difficulty-slider">
                                                <option value="30">30sec</option>
                                                <option value="60">1 Minutes</option>
                                                <option value="120">2 Minutes</option>
                                            </select>

                                        </td>
                                    </tr>
                                </>
                            )}
                        </table>



                        {/* Timer Toggle */}



                        {/* Timer Duration (Only if Timer is Enabled) */}


                        {/* Buttons */}
                        <div className="dialog-buttons">
                            <button onClick={confirmGameStart}>Start</button>
                            <button onClick={() => setShowDialog(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
