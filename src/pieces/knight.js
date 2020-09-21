import Piece from './piece.js';

export default class KnightPiece extends Piece {
    constructor(color, name, rend, size, layer) {
        super(`assets/images/knight_${color}.png`, name, rend, size, layer);
    }
}