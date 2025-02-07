import { useState, useEffect } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants";
import { shuffle, canSwap, swap, solved } from "./helpers";
import { fetchRandomImage } from "./fetchimage";

function Board() {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
    const [isStarted, setIsstarted] = useState(false);
    const [imageurl, setimage] = useState("");
    const [moves, setmoves] = useState(0);
    console.log(imageurl);
    console.log('is started', isStarted)

    const shuffletiles = () => {
        const shuffledTiles = shuffle(tiles);
        setTiles(shuffledTiles);
    }

    const swaptiles = (tileindex) => {
        if (canSwap(tileindex, tiles.indexOf(tiles.length - 1))) {
            const swapped = swap(tiles, tileindex, tiles.indexOf(tiles.length - 1));
            setTiles(swapped);
        }
    }

    const handleTileClick = (index) => {
        swaptiles(index);
        setmoves(moves + 1);
    }
    const handleShuffleClick = () => {
        shuffletiles();
    }
    const handleStartClick = () => {
        shuffletiles();
        setIsstarted(true);
    }
    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceheight = Math.round(BOARD_SIZE / GRID_SIZE);

    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
        
    };
    useEffect(() => {
        async function get() {
            const img = await fetchRandomImage();
            setimage(img);
        }
        get();
    }, []);
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
                            imageurl={imageurl}
                        />
                    ))}
                </ul>
                {!isStarted ? <div></div>:
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
                }
            </div>

            {Won && isStarted && <div>Puzzle Solved</div>}
            {<div>Moves: {moves}</div>}

            {!isStarted ? (<button onClick={() => handleStartClick()}>Start Game</button>) : (<button onClick={() => handleShuffleClick()}>Restart Game</button>)}
        </>
    )
}

export default Board;