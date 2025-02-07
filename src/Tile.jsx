import React from "react";
import { getMatrixPosition, getVisualPosition } from "./helpers";
import {  BOARD_SIZE } from "./constants";

function Tile(arg) {
    const { tile, index, width, height, handleTileClick, imageurl,TILE_COUNT,GRID_SIZE } = arg;
    
    const { row, col } = getMatrixPosition(index,GRID_SIZE);
    const visualpos = getVisualPosition(row, col, width, height);
    const tileStyle = {
        width: `calc(100% / ${GRID_SIZE})`,
        height: `calc(100% / ${GRID_SIZE})`,
        translateX: visualpos.x,
        translateY: visualpos.y,

    }

    return (


        <li style={{
            width: `${width}px`,
            height: `${height}px`,
            position: "absolute",  // Ensures tiles are placed in the grid
            top: `${visualpos.y}px`,  // Position tile in the correct row
            left: `${visualpos.x}px`, // Position tile in the correct column
            
            color: "white",
            display: "flex",
            
            backgroundImage: `url(${imageurl})`,
            backgroundSize: `${BOARD_SIZE}px ${BOARD_SIZE}px `,
            backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * (Math.floor(tile / GRID_SIZE))}%`,
            backgroundRepeat: "no-repeat",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            border:"2px solid black",
            cursor: "pointer",
            transition: "top 0.2s, left 0.2s ease-in-out",
        }}
            className="tile"
            onClick={() => handleTileClick(index)}>
                
            
            
        </li>



    )
}

export default Tile;