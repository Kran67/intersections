class Rectangle2D extends Shape2D {
    constructor(transparent) {
        super();
        this.transparent = transparent;
        this.shapeType = shapeType.RECTANGLE;
    }
    drawTo(ctx) {
        ctx.save();
        if (this.selected) {
            ctx.strokeStyle = 'black';
            ctx.setLineDash([5, 5]);
        } else {
            ctx.strokeStyle = this.strokeStyle;
        }
        ctx.fillStyle = this.fillStyle;
        if (!this.transparent) {
            ctx.fillRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);
        }
        ctx.strokeRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);
        ctx.restore();
        super.drawTo(ctx);
    }
}