exports.knightMoves = (col, row) => {
    let squares    = {
        knight: '',
        upperLeftLaid: '',
        upperRightLaid: '',
        lowerLeftLaid: '',
        lowerRightLaid: '',
        upperLeftStand: '',
        upperRightStand: '',
        lowerLeftStand: '',
        lowerRightStand: ''
    };

    col = +col;
    row = +row;

    if(isValidSquare(col, row)){
        squares.knight = getSquare(col,row);
    }

    let cull = col - 2;
    let rull = row - 1;
    
    if(isValidSquare(cull, rull)){
        squares.upperLeftLaid = getSquare(cull, rull);
    }

    let curl = col + 2;
    let rurl = row - 1;

    if(isValidSquare(curl, rurl)){
        squares.upperRightLaid = getSquare(curl, rurl);
    }

    let clll = col - 2;
    let rlll = row + 1;
    
    if(isValidSquare(clll, rlll)){
        squares.lowerLeftLaid = getSquare(clll, rlll);
    }

    let clrl = col + 2;
    let rlrl = row + 1;
    
    if(isValidSquare(clrl, rlrl)){
        squares.lowerRightLaid = getSquare(clrl, rlrl);
    }
    
    let culs = col - 2;
    let ruls = row - 1;
    
    if(isValidSquare(culs, ruls)){
        squares.upperLeftStand = getSquare(culs, ruls);
    }

    let curs = col + 1;
    let rurs = row - 2;

    if(isValidSquare(curs, rurs)){
        squares.upperRightStand = getSquare(curs, rurs);
    }

    let clls = col - 1;
    let rlls = row + 2;
    
    if(isValidSquare(clls, rlls)){
        squares.lowerLeftStand = getSquare(clls, rlls);
    }

    let clrs = col + 1;
    let rlrs = row + 2;
    
    if(isValidSquare(clrs, rlrs)){
        squares.lowerLeftStand = getSquare(clrs, rlrs);
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