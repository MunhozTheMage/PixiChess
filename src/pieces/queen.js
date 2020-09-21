import Piece from './piece.js';

export default class QueenPiece extends Piece {
    constructor(color, name, rend, size, layer) {
        super(`assets/images/queen_${color}.png`, name, rend, size, layer);
    }
}