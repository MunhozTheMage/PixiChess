import Piece from './piece.js';

export default class KingPiece extends Piece {
    constructor(color, name, rend, size, layer) {
        super(`assets/images/king_${color}.png`, name, rend, size, layer);
    }
}