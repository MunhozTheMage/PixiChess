import Piece from './piece.js';

export default class PawnPiece extends Piece {
    constructor(color, name, rend, size, layer) {
        super(`assets/images/pawn_${color}.png`, name, rend, size, layer);
        this.color = color;
    }

    getPosibleMovementPositions(tileSize, piecesCollection) {
        let moves = [];
        let fowardFree = true;

        for(var i in piecesCollection) {
            let piece = piecesCollection[i];
            console.log(piece);

            let x = this.x / tileSize, y = this.y / tileSize;
            let pieceX = piece.x / tileSize, pieceY = piece.y / tileSize;

            if(
                (pieceY === y - 1 && pieceX === x && piece.color === 'w') ||
                (pieceY === y + 1 && pieceX === x && piece.color === 'b')
            ) {
                fowardFree = false;
            }

            if(this.color !== piece.color) {    
                if(this.color === 'w') {
                    if(this.y < tileSize * 7 && y + 1 === pieceY) {
                        if(x + 1 === pieceX) {
                            moves.push([this.x + tileSize, this.y + tileSize, this.eatColor]);
                        } else if(x - 1 === pieceX) {
                            moves.push([this.x - tileSize, this.y + tileSize, this.eatColor]);
                        }
                    }
                } else {
                    if(this.y > 0 && y - 1 === pieceY) {
                        if(x + 1 === pieceX) {
                            moves.push([this.x + tileSize, this.y - tileSize, this.eatColor]);
                        } else if(x - 1 === pieceX) {
                            moves.push([this.x - tileSize, this.y - tileSize, this.eatColor]);
                        }
                    }
                }
            }
        }

        if(this.color === 'w') {
            if(this.y < tileSize * 7 && fowardFree) {
                console.log(true);
                moves.push([this.x, this.y + tileSize, this.moveColor]);
            }
        } else {
            if(this.y > 0 && fowardFree) {
                moves.push([this.x, this.y - tileSize, this.moveColor]);
            }
        }

        return moves
    }
}