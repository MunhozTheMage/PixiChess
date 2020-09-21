import * as PIXI from 'pixi.js';

export default class Renderer {
    constructor(stage, layers) {
        this.stage = stage;
        this.layers = (
            layers
            .map((name) => {
                return { name, content: [] }
            })
        )
    }

    // Renders a child in the specified layer.
    renderOnLayer(child = {}, childName = '', layerName = '') {
        if(this.getLayer(layerName) < 0) return null;
        if(this.getChildByNameOnLayer(childName, layerName)) {
            throw new Error(
            `Error on layer ${layerName}: childs must have unique names (${childName}).`
            );
        }

        child._Renderer_name = childName;
        child.zIndex = this.getLayer(layerName);
        this.layers[this.getLayer(layerName)].content
        .push({ name: childName, element: child });

        this.stage.addChild(child);
        return child;
    }

    // Gets the index of a layer by its name, is -1 if
    // non-existent.
    getLayer(name) {
        for(var i in this.layers) {
            if(this.layers[i].name === name) return +i;
        }
        return -1;
    }

    // Gets a child with the specified name in a
    // certain layer, returns null if non-existent.
    getChildByNameOnLayer(childName = '', layerName = '') {
        if(this.getLayer(layerName) < 0) {
            return null
        };

        var layer = this.layers[this.getLayer(layerName)];
        for(var i = 0; i < layer.content.length; i++) {
            if(layer.content[i].name === childName) return layer.content[i].element;
        }

        return null;
    }

    getChildNameByValueOnLayer(child, layerName) { 
        if(this.getLayer(layerName) < 0) return null;
        
        var layer = this.layers[this.getLayer(layerName)];
        for(var i = 0; i < layer.content.length; i++) {
            if(layer.content[i].element === child) return layer.content[i].name;
        }

        return null;
    }

    // Change the dimensions of a given sprite, will keep
    // the sprite ratio unless otherwise specified, or if
    // both width and height are set to a specific value.
    // Use NaN to keep the property as is.
    setSpriteDimensions(sprite, width, height, keepProportion = true) {
        if(!isNaN(height)) {
            let originalHeight = sprite.height;
            sprite.height = height;
            if(isNaN(width) && keepProportion) {
                sprite.width *= (height / originalHeight);
            }
        }

        if(!isNaN(width)) {
            let originalWidth = sprite.width;
            sprite.width = width;
            if(isNaN(height) && keepProportion) {
                sprite.height *= (width / originalWidth);
            }
        }
    }

    // Creates a custom sprite.
    createSprite(path, x, y, config) {
        config = {
            width: NaN,
            height: NaN,
            anchor: 0,
            keepProportion: true,
            ...config
        }

        let sprite = new PIXI.Sprite.from(path);
        sprite.x = x;
        sprite.y = y;
        sprite.anchor.set(config.anchor);
        this.setSpriteDimensions(
            sprite,
            config.width,
            config.height,
            config.keepProportion
        )

        return sprite;
    }

    // Creates a simple rectangle
    createRect(x, y, width, height, color = 0x000000, borderWidth = 0, borderColor = 0x000000) {
        let rect = new PIXI.Graphics();
        rect.lineStyle(borderWidth, borderColor, 1);
        rect.beginFill(color, 1);
        rect.drawRect(x, y, width, height);
        return rect;
    }

    // Removes a child from the layer, this function returns
    // the removed child.
    removeChildFromLayer(childName, layerName) {
        if(this.getLayer(layerName) < 0) return null;

        let newLayer = [];
        let removedChild;

        this.layers[this.getLayer(layerName)].content
        .forEach((child) => {
            if(child.name === childName) {
                removedChild = child;
            } else {
                newLayer.push(child);
            }
        });

        this.layers[this.getLayer(layerName)].content = newLayer;
        this.stage.removeChild(removedChild.element);

        return removedChild;
    }

    clearLayer(layerName) {
        if(this.getLayer(layerName) < 0) return null;
        let layer = this.layers[this.getLayer(layerName)];
        let content = layer.content;

        layer.content
        .forEach((child) => {
            this.removeChildFromLayer(child.name, layerName);
        });

        return content;
    }
}