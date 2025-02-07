import { useState, useEffect } from "react";
import Tile from "./Tile";
import {BOARD_SIZE, getgrid, gettile } from "./constants";
import { shuffle, canSwap, swap, solved } from "./helpers";
import { fetchRandomImage } from "./fetchimage";
import { useNavigate } from "react-router-dom";
function Board({difficulty , imageurl}) {
    const GRID_SIZE=getgrid(difficulty);
    const TILE_COUNT=gettile(GRID_SIZE);
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
    const [isStarted, setIsstarted] = useState(false);
    const [moves, setmoves] = useState(0);
    
    console.log('is started', isStarted)
    const shuffletiles = () => {
        const shuffledTiles = shuffle(tiles,TILE_COUNT);
        setTiles(shuffledTiles);
    }
    
    

    const swaptiles = (tileindex) => {
        if (canSwap(tileindex, tiles.indexOf(tiles.length - 1),GRID_SIZE)) {
            const swapped = swap(tiles, tileindex, tiles.indexOf(tiles.length - 1));
            setTiles(swapped);
        }
    }
    const navigate=useNavigate();
    const handleTileClick = (index) => {
        swaptiles(index);
        setmoves(moves + 1);
    }
    const handleShuffleClick = () => {
        navigate("/")
    }
    const handleStartClick = () => {
        shuffletiles();
        setIsstarted(true);
        setmoves(0);
    }
    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceheight = Math.round(BOARD_SIZE / GRID_SIZE);

    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
        
    };
    useEffect(()=>{
        setIsstarted(true);
        shuffletiles();
    },[])
    const Won = solved(tiles);
    return (
        <>
            <div className="target">
                <ul style={style} className="board">
                    {tiles.map((tile, index) => (
                        <Tile
                            key={tile}
                            index={index}
                            tile={tile}
                            width={pieceWidth}
                            height={pieceheight}
                            handleTileClick={handleTileClick}
                            imageurl= {imageurl}
                            TILE_COUNT={TILE_COUNT}
                            GRID_SIZE={GRID_SIZE}
                        />
                    ))}
                </ul>
                
                <div className="target1">
                    <div>
                        <h3>target image</h3>
                    </div>

                    <div className="targetimg" style={{
                        width: `${BOARD_SIZE}px`,
                        height: `${BOARD_SIZE}px`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px solid white", // Optional: To make the target image visible
                    }}>
                        <img
                            src={imageurl}
                            alt="Target Puzzle Image"
                            style={{
                                width: `${BOARD_SIZE}px`,
                                height: `${BOARD_SIZE}px`,
                                objectFit: "cover"  // Ensures the image covers the whole space without stretching
                            }}
                        />
                    </div>

                </div>
                
            </div>

            {Won && isStarted && <div>Puzzle Solved</div>}
            {<div>Moves: {moves}</div>}

            <button onClick={() => handleShuffleClick()}>Restart Game</button>
        </>
    )
}

export default Board;