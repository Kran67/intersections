class Polygon2D extends Polyline2D {
    constructor(transparent, pts = []) {
        super(transparent, pts);
        this.shapeType = shapeType.POLYGON;
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
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach((pt, idx) => {
            if (idx > 0) {
                ctx.lineTo(this.points[idx].x, this.points[idx].y);
            }
        });
        ctx.closePath();
        if (!this.transparent) {
            ctx.fill();
        }
        ctx.stroke();
        ctx.restore();
        super.drawTo(ctx);
    }
}