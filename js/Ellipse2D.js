class Ellipse2D extends Shape2D {
    constructor(transparent) {
        super();
        this.transparent = transparent;
        this.shapeType = shapeType.ELLIPSE;
    }
    get center() {
        const rec = this.rect;
        return new Point2D(rec.left + (rec.width / 2), rec.top + (rec.height / 2));
    }
    get rxry() {
        const center = this.center;
        const rec = this.rect;
        return new Point2D(Math.abs(center.x - rec.left), Math.abs(center.y - rec.top));
    }
    drawTo(ctx) {
        ctx.save();
        //if (this.selected) {
        //    ctx.strokeStyle = 'black';
        //    ctx.setLineDash([5, 5]);
        //} else {
            ctx.strokeStyle = this.strokeStyle;
        //}
        ctx.fillStyle = this.fillStyle;
        const rxry = this.rxry;
        ctx.beginPath();
        ctx.ellipse(this.center.x, this.center.y, rxry.x, rxry.y, 0, 0, 2 * Math.PI);
        if (!this.transparent) {
            ctx.fill();
        }
        ctx.stroke();
        ctx.restore();
        super.drawTo(ctx);
    }
}