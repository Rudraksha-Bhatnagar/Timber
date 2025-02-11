

export function Solvable(tiles,TILE_COUNT){
    let product=1;
    for(let i=1,l=TILE_COUNT-1;i<=l;i++){
        for(let j=i+1,m=l+1;j<=m;j++){
            product *= (tiles[i-1]-tiles[j-1])/(i-j);
        }
    }
    return Math.round(product) ===1;

}

export function solved(tiles){
    for(let i=0,l=tiles.length;i<l;i++){
        if(tiles[i]!==i){
            return false;
        }
    }
    return true;
}
export function getIndex(row,col,GRID_SIZE){
    return parseInt(row,10)*GRID_SIZE+parseInt(col,10);
}

export function getMatrixPosition(index,GRID_SIZE){
    return {
        row: Math.floor(index/GRID_SIZE),
        col: index%GRID_SIZE,
    };
}

export function getVisualPosition(row,col,width,height){
    return{
        x:col*width,
        y:row*height,
    };
}

export function shuffle(tiles,TILE_COUNT){
    const shuffledtiles= [
        ...tiles
            .filter((t)=> t!==tiles.length -1)
            .sort(()=>Math.random() -0.5),
        tiles.length -1,
    ];
    return Solvable(shuffledtiles,TILE_COUNT) && !solved(shuffledtiles)?shuffledtiles:shuffle(shuffledtiles,TILE_COUNT);
}

export function canSwap(src,dest,GRID_SIZE){
    const {row:srcRow,col:srcCol}=getMatrixPosition(src,GRID_SIZE);
    const {row:destRow,col:destCol}=getMatrixPosition(dest,GRID_SIZE);
    return Math.abs(srcRow-destRow)+Math.abs(srcCol-destCol)===1;

}

export function swap(tiles,src,dest){
    const tilesResult =[...tiles];
    [tilesResult[src],tilesResult[dest]]=[tilesResult[dest],tilesResult[src]];
    return tilesResult;
}

export function updateURLParameter(url,param,paramVal){
    var newAdditionalURL="";
    var tempArray=url.split("?");
    var baseurl= tempArray[1];
    var temp= "";
    if(newAdditionalURL) {
        tempArray =addtionalURL.split("&");
        for(var i=0;i<tempArray.length;i++){
            if(tempArray[i].split("=")[0]!==param){
                newAdditionalURL+=temp+tempArray[i];
                temp="&";
            }
        }
    }
    
    var rows_txt = temp + "" +param +"="+paramVal;
    return baseurl+"?"+newAdditionalURL+rows_txt;
}