import { useState } from "react";
import Tile from "./Tile";
import { TILE_COUNT,GRID_SIZE,BOARD_SIZE } from "./constants";
import { shuffle,canSwap,swap,solved } from "./helpers";

function Board({imgurl}){
    const [tiles,setTiles] = useState([...Array(TILE_COUNT).keys()]);
    const [isStarted,setIsstarted]=useState(false);
    console.log('is started',isStarted)

    const shuffletiles=()=>{
        const shuffledTiles= shuffle(tiles);
        setTiles(shuffledTiles);
    }

    const swaptiles = (tileindex) => {
        if(canSwap(tileindex,tiles.indexOf(tiles.length-1))){
            const swapped=swap(tiles,tileindex,tiles.indexOf(tiles.length-1));
            setTiles(swapped);
        }
    }

    const handleTileClick =(index)=>{
        swaptiles(index);
    }
    const handleShuffleClick=()=>{
        shuffletiles();
    }
    const handleStartClick=()=>{
        shuffletiles();
        setIsstarted(true);
    }
    const pieceWidth = Math.round(BOARD_SIZE/GRID_SIZE);
    const pieceheight =Math.round(BOARD_SIZE/GRID_SIZE);
    const style = {
        width:BOARD_SIZE,
        height:BOARD_SIZE,
    };
    const Won=solved(tiles);
    return (
        <>
            <ul style={style} className="board">
                {tiles.map((tile,index)=>(
                    <Tile
                        key={tile}
                        index={index}
                        tile={tile}
                        width={pieceWidth}
                        height={pieceheight}
                        handleTileClick={handleTileClick}
                        imageurl={imgurl}
                    />
                ))}
            </ul>
            {Won && isStarted&& <div>Puzzle Solved</div>}
            {!isStarted?(<button onClick={()=>handleStartClick()}>Start Game</button>):(<button onClick={()=>handleShuffleClick()}>Restart Game</button>)}
        </>
    )
}

export default Board;