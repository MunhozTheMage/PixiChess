import Piece from './piece.js';

export default class RookPiece extends Piece {
    constructor(color, name, rend, size, layer) {
        super(`assets/images/rook_${color}.png`, name, rend, size, layer);
    }
}