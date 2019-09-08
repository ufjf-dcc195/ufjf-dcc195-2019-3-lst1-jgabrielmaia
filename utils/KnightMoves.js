exports.knightMoves = (col, row) => {
    let squares    = {
        knight: '',
        upperLeft: '',
        upperRight: '',
        lowerLeft: '',
        lowerRight: ''
    };

    col = +col;
    row = +row;

    if(isValidSquare(col, row)){
        squares.knight = getSquare(col,row);
    }

    let cul = col - 2;
    let rul = row - 1;
    
    if(isValidSquare(cul, rul)){
        squares.upperLeft = getSquare(cul, rul);
    }

    let cur = col + 2;
    let rur = row - 1;

    if(isValidSquare(cur, rur)){
        squares.upperRight = getSquare(cur, rur);
    }

    let cll = col - 2;
    let rll = row + 1;
    
    if(isValidSquare(cll, rll)){
        squares.lowerLeft = getSquare(cll, rll);
    }

    let clr = col + 2;
    let rlr = row + 1;
    
    if(isValidSquare(clr, rlr)){
        squares.lowerRight = getSquare(clr, rlr);
    }
    
    return squares;
}

getSquare = (c,r) => {
    return c + (r -1) * 8;
}

isValidSquare = (col, row) => {
    return isBounded(col) && isBounded(row);
}

isBounded = (x) => {
    return (x >= 1 && x <= 8);
}