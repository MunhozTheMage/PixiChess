import ChessBoard from './board.js';
import Renderer from './renderer.js';
import KingPiece from './pieces/king.js';
import QueenPiece from './pieces/queen.js'
import PawnPiece from './pieces/pawn.js';
import KnightPiece from './pieces/knight.js';
import BishopPiece from './pieces/bishop.js';
import RookPiece from './pieces/rook.js';

export default class Game {
    constructor(app, startingBoard) {
        this.app = app;
        this.renderer = new Renderer(
            app.stage, 
            [
                "background",
                "board",
                "pieces",
                "ui"
            ]
        );
        this.startingBoard = startingBoard || (
            // 0: Nothing, 1: King, 2: Queen, 3: Pawn, 4: Knight, 5: Bishop, 6:Rook.
            // w: white, b: black, 0: nothing.
            [
                ['6w', '5w', '4w', '2w', '1w', '4w', '5w', '6w'],
                ['3w', '3w', '3w', '3w', '3w', '3w', '3w', '3w'],
                ['00', '00', '00', '00', '00', '00', '00', '00'],
                ['00', '00', '00', '00', '00', '00', '00', '00'],
                ['00', '00', '00', '00', '00', '00', '00', '00'],
                ['00', '00', '3w', '00', '00', '00', '00', '00'],
                ['3b', '3b', '3b', '3b', '3b', '3b', '3b', '3b'],
                ['6b', '5b', '4b', '2b', '1b', '4b', '5b', '6b']
            ]
        );
        this.board = new ChessBoard(90, 0xfff3d4, 0xdbc997);
        this.pieceCollection = [];
        this.selctedPiece = null;
        this.state = {
            // 'w' or 'b'
            turn: "w",
            // true or false
            gameRunning: true,
            // 'piece_selection' or 'movement'
            turnStage: "piece_selection" 
        }
    }

    initializeGame() {
        this.board.render(this.renderer, "board", this.app.view);
        this.renderPieces();
        this.changeState('w', 'piece_selection', true);
    }

    renderPieces() {
        for(var y = 0; y < 8; y++) {
            for(var x = 0; x < 8; x++) {
                let pieceType = this.startingBoard[x][y].split('');
                let piece;

                switch(+pieceType[0]) {
                    case 1:
                        piece = new KingPiece(
                            pieceType[1],
                            `king_${(y * 8) + x}_${pieceType[1]}`,
                            this.renderer,
                            90,
                            "pieces"
                        )
                        break;
                    case 2:
                        piece = new QueenPiece(
                            pieceType[1],
                            `queen_${(y * 8) + x}_${pieceType[1]}`,
                            this.renderer,
                            90,
                            "pieces"
                        )
                        break;
                    case 3:
                        piece = new PawnPiece(
                            pieceType[1],
                            `pawn_${(y * 8) + x}_${pieceType[1]}`,
                            this.renderer,
                            90,
                            "pieces"
                        )
                        break;
                    case 4:
                        piece = new KnightPiece(
                            pieceType[1],
                            `knight_${(y * 8) + x}_${pieceType[1]}`,
                            this.renderer,
                            90,
                            "pieces"
                        )
                        break;
                    case 5:
                        piece = new BishopPiece(
                            pieceType[1],
                            `bishop_${(y * 8) + x}_${pieceType[1]}`,
                            this.renderer,
                            90,
                            "pieces"
                        )
                        break;
                    case 6:
                        piece = new RookPiece(
                            pieceType[1],
                            `rook_${(y * 8) + x}_${pieceType[1]}`,
                            this.renderer,
                            90,
                            "pieces"
                        )
                        break;
                }

                if(piece) {
                    piece.render();
                    piece.setPositionByTile(90, y, x);
                    this.pieceCollection.push(piece);
                }
            }
        }
    }

    getPieceByName(name) {
        for(var i in this.pieceCollection) {
            if(this.pieceCollection[i].name === name) {
                return this.pieceCollection[i];
            }
        }

        return null;
    }

    getPieceByPosition(x, y) {
        for(var i in this.pieceCollection) {
            console.log(pieceCollection[i].x);
            if(this.pieceCollection[i].x === x && this.pieceCollection[i].y === y) {
                return this.pieceCollection[i];
            }
        }

        return null;
    }

    tooglePiecesInteractivity(color, interactive) {
        let blacks = color.includes('b');
        let whites = color.includes('w');

        for(var i in this.pieceCollection) {
            let piece = this.pieceCollection[i];
            let color = piece.name.split('_')[2];

            if((whites && color === 'w') || (blacks && color === 'b')) {
                let sprite = this.renderer.getChildByNameOnLayer(
                    piece.name, 'pieces'
                );

                sprite.interactive = interactive;
            }

        }
    }

    toogleUIIteractivity(interactive) {
        let layer = this.renderer.layers[this.renderer.getLayer('ui')];
        layer.content.forEach((v) => {
            v.element.interactive = interactive;
        });
    }

    changeState(turn = null, turnStage = null, gameRunning = null) {
        if(turn && (turn === 'w' || turn === 'b')) {
            this.tooglePiecesInteractivity(
                turn, true
            );
            this.tooglePiecesInteractivity(
                turn === 'w' ? 'b' : 'w', false
            );
            this.state.turn = turn;
        }

        if(turnStage) {
            let uiLayer = this.renderer.layers[this.renderer.getLayer('ui')];
            console.log(uiLayer.content.length);

            if(turnStage === 'piece_selection') {
                this.renderer.clearLayer('ui');
                this.tooglePiecesInteractivity(
                    this.state.turn, true
                );
                this.tooglePiecesInteractivity(
                    this.state.turn === 'w' ? 'b' : 'w', 
                    false
                );
            } else if (
                turnStage === 'movement' &&
                uiLayer.content.length > 0
            ) {
                this.tooglePiecesInteractivity('bw', false);
                this.toogleUIIteractivity(true);
            }

            this.state.turnStage = turnStage;
        }

        if(gameRunning !== null) {
            this.state.gameRunning = gameRunning;
        }
    }

    event_clickController(e) {
        if(this.state.gameRunning) {
            if(
                this.state.turnStage === 'piece_selection' &&
                e.target._Renderer_name
            ) {
                this.selctedPiece = this.event_getPiece(e);
                this.event_displayPieceMoveArea(e);
                this.changeState(null, "movement");
            } else if(
                this.state.turnStage === 'movement' &&
                e.target._Renderer_name
            ) {
                this.event_movePiece(e);
                this.selctedPiece = null;
                this.changeState(
                    this.state.turn === 'w' ? 'b' : 'w',
                    'piece_selection'
                );
            }
        }
    }

    event_getPiece(e) {
        return this.getPieceByName(e.target._Renderer_name);
    }

    event_displayPieceMoveArea(e) {
        let piece = this.event_getPiece(e);

        if(!piece) return;

        this.renderer.clearLayer('ui');
        let moves = piece.getPosibleMovementPositions(
            this.board.cellSize, this.pieceCollection
        );

        moves.forEach((move, i) => {
            let x = move[0], y = move[1], color = move[2];

            let rect = this.renderer.createRect(
                x, y, 
                this.board.cellSize, 
                this.board.cellSize,
                color
            );

            rect.alpha = 0.4;

            this.renderer.renderOnLayer(rect, `move_${x}_${y}`, 'ui')
        });
    }

    event_movePiece(e) {
        if(!this.selctedPiece) return;

        let x = e.target._Renderer_name.split('_')[1];
        let y = e.target._Renderer_name.split('_')[2];
        console.log(x, y);

        this.selctedPiece.setPositionByTile(
            this.board.cellSize,
            x / this.board.cellSize,
            y / this.board.cellSize
        );
    }
}