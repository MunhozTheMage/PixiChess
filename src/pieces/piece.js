export default class Piece {
    constructor(sprite, name, rend, size, layer) {
        this.sprite = sprite;
        this.name = name;
        this.renderer = rend;
        this.layer = layer;
        this.size = size;
        this.x = 0;
        this.y = 0;
        this.moveColor = 0x00ff00; 
        this.eatColor = 0xff0000;
    }

    render() {
        let sprite = this.renderer.createSprite(this.sprite, 0, 0, {
            width: this.size
        });

        this.renderer.renderOnLayer(
            sprite,
            this.name,
            this.layer
        )
    }

    setPosition(x, y) {
        let sprite = this.renderer.getChildByNameOnLayer(this.name, this.layer);
        if(!sprite) return;

        sprite.x = x;
        sprite.y = y;
    }

    setPositionByTile(tileSize, tileX, tileY, leftOffset = 0, topOffset = 0) {
        let x = leftOffset + (tileSize * tileX) + ((tileSize - this.size) / 2);
        let y = topOffset + (tileSize * tileY) + ((tileSize - this.size) / 2);
        this.x = x;
        this.y = y;
        this.setPosition(x, y);
    }

    setInteractivityState(isInteractive = true) {
        let sprite = this.renderer.getChildByNameOnLayer(this.name, this.layer);
        if(!sprite) return;

        sprite.interactive = isInteractive;
    }
}