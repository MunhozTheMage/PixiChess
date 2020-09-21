import Piece from './piece.js';

export default class BishopPiece extends Piece {
    constructor(color, name, rend, size, layer) {
        super(`assets/images/bishop_${color}.png`, name, rend, size, layer);
    }
}