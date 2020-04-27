class Line2D extends Shape2D {
    constructor(x, y, x1, y1) {
        super();
        this.rect.left = x;
        this.rect.top = y;
        this.rect.right = x1;
        this.rect.bottom = y1;
        this.shapeType = shapeType.LINE;
    };
    get extr() {
        return new Rect2D(this.rect.left, this.rect.top, this.rect.right, this.rect.bottom);
    }
    get firstPoint() {
        return new Point2D(this.rect.left, this.rect.top);
    }
    get secondPoint() {
        return new Point2D(this.rect.right, this.rect.bottom);
    }
    drawTo(ctx) {
        ctx.save();
        if (this.selected) {
            ctx.strokeStyle = 'black';
            ctx.setLineDash([5, 5]);
        } else {
            ctx.strokeStyle = this.strokeStyle;
        }
        ctx.beginPath();
        ctx.moveTo(this.rect.left, this.rect.top);
        ctx.lineTo(this.rect.right, this.rect.bottom);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        super.drawTo(ctx);
    }
}