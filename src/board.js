import * as PIXI from 'pixi.js';

export default class ChessBoard {
    constructor(cellSize, color1, color2) {
        this.cellSize = cellSize;
        this.color1 = color1;
        this.color2 = color2;
    }

    render(rend, layer, appView) {
        for(var x = 0; x < 8; x++) {
            for(var y = 0; y < 8; y++) {
                var tile = rend.createRect(
                    (appView.width / 2) - ((4 - x) * this.cellSize),
                    (appView.height / 2) - ((4 - y) * this.cellSize),
                    this.cellSize, this.cellSize, 
                    (x + y) % 2 === 0 ? this.color1 : this.color2
                )
                tile.interactive = false;
                rend.renderOnLayer(tile, `tile_${x}_${y}`, layer);
            }
        }
    }

    toogleInteractivityForTiles(rend, layer, toogleTo = false, tilesArray = []) {
        if(tilesArray.length === 0) {
            for(var x = 0; x < 8; x++) {
                for(var y = 0; y < 8; y++) {
                    tilesArray.push([x, y]);
                }
            }
        }

        tilesArray.forEach((tiles) => {
            rend.getChildByName((`tile_${tiles[0]}_${tiles[1]}`), layer)
            .interactive = toogleTo;
        });
    }
}