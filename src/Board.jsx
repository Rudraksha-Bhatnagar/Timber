import { useState, useEffect } from "react";
import Tile from "./Tile";
import { BOARD_SIZE, getgrid, gettile } from "./constants";
import { shuffle, canSwap, swap, solved } from "./helpers";
import { fetchRandomImage } from "./fetchimage";
import { useNavigate } from "react-router-dom";
import  {FaUndo , FaRedo,FaTimes,FaBars } from "react-icons/fa";
function Board({ difficulty, imageurl }) {
    const GRID_SIZE = getgrid(difficulty);
    const TILE_COUNT = gettile(GRID_SIZE);
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
    const [isStarted, setIsstarted] = useState(false);
    const [moves, setmoves] = useState(0);
    const [history,sethistory]=useState([]);
    const [redo,setredo]=useState([]);
    console.log('is started', isStarted)
    const shuffletiles = () => {
        const shuffledTiles = shuffle(tiles, TILE_COUNT);
        setTiles(shuffledTiles);
        sethistory([]);
        setredo([]);
    }
    const [leaderboard, setLeaderboard] = useState(
        JSON.parse(localStorage.getItem("leaderboard")) || []
    );
    
    const swaptiles = (tileindex) => {
        if (canSwap(tileindex, tiles.indexOf(tiles.length - 1), GRID_SIZE)) {
            const swapped = swap(tiles, tileindex, tiles.indexOf(tiles.length - 1));
            sethistory([...history,tiles]);
            setmoves(moves + 1);
            setTiles(swapped);
            setredo([]);
        }
    }
    const handleundo=()=>{
        if(history.length>0){
            const prev=history[history.length-1];
            setredo([tiles,...redo]);
            setTiles(prev);
            sethistory(history.slice(0,-1));
            setmoves(moves-1);
        }
    };
    const handleredo=()=>{
        if(redo.length>0){
            const next=redo[0];
            sethistory([...history,tiles]);
            setTiles(next);
            setredo(redo.slice(1));
            setmoves(moves+1);
        }
    }
    const navigate = useNavigate();
    const handleTileClick = (index) => {
        swaptiles(index);
        
    }
    const handleShuffleClick = () => {
        navigate("/")
    }
    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceheight = Math.round(BOARD_SIZE / GRID_SIZE);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE,

    };
    useEffect(() => {
        setIsstarted(true);
        shuffletiles();
    }, [])
    const Won = solved(tiles);
    useEffect(() => {
        if (Won && isStarted) {
            let playerName = prompt("🎉 You won! Enter your name:");
            if (playerName) {
                const newPlayer = {
                    userID: crypto.randomUUID(), // Unique identifier
                    name: playerName,
                    moves: moves
                };

                const updatedLeaderboard = [...leaderboard, newPlayer];
                updatedLeaderboard.sort((a, b) => a.moves - b.moves); // Sort by lowest moves

                setLeaderboard(updatedLeaderboard);
                localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
            }
        }
    },[Won,isStarted])
    
    return (
        <>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <h2>🏆 Leaderboard</h2>
                <table className="tableleader">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Moves</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((player, index) => (
                            <tr key={player.userID}>
                                <td>{index + 1}</td>
                                <td>{player.name}</td>
                                <td>{player.moves}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="game-container">
                <div className="target">
                    <div className="puzzle">
                        <h3>SOLVE</h3>
                        <ul style={style} className="board">
                            {tiles.map((tile, index) => (
                                <Tile
                                    key={tile}
                                    index={index}
                                    tile={tile}
                                    width={pieceWidth}
                                    height={pieceheight}
                                    handleTileClick={handleTileClick}
                                    imageurl={imageurl}
                                    TILE_COUNT={TILE_COUNT}
                                    GRID_SIZE={GRID_SIZE}
                                />
                            ))}
                        </ul>
                    </div>
    
                    <div className="target1">
                        <h3>TARGET</h3>
                        <div className="targetimg">
                            <img
                                src={imageurl}
                                alt="Target Puzzle Image"
                                style={{
                                    width: `${BOARD_SIZE}px`,
                                    height: `${BOARD_SIZE}px`,
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                    </div>
                </div>
    
                
            </div>
    
            {Won && isStarted && <div>Puzzle Solved</div>}
            <div className="MOVE">Moves: {moves}</div>
            <div className="button-container">
                <button onClick={handleundo} disabled={history.length === 0}><FaUndo /></button>
                <button onClick={handleredo} disabled={redo.length === 0}><FaRedo /></button>
                <button onClick={handleShuffleClick}>Restart Game</button>
            </div>
        </>
    );
    
}
export default Board;