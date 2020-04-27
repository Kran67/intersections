class Polyline2D extends Shape2D {
    constructor(transparent, pts = []) {
        super();
        this.points = pts;
        this.ptToMove = 0;
        this.transparent = transparent;
        this.shapeType = shapeType.POLYLINE;
    }
    get rect() {
        const result = new Rect2D();
        this.points.forEach((point, i) => {
            if (i > 0) {
                if (point.x <= result.left) {
                    result.left = point.x;
                }
                if (point.x >= result.right) {
                    result.right = point.x;
                }
                if (point.y <= result.top) {
                    result.top = point.y;
                }
                if (point.y >= result.bottom) {
                    result.bottom = point.y;
                }
            } else {
                result.left = point.x;
                result.right = point.x;
                result.top = point.y;
                result.bottom = point.y;
            }
        });
        return result;
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
        this.points.forEach((point, i) => {
            if (i > 0) {
                ctx.lineTo(point.x, point.y);
            }
        });
        if (this instanceof Polygon2D) {
            ctx.closePath();
            if (!this.transparent) {
                ctx.fill();
            }
        }
        ctx.stroke();
        ctx.restore();
        super.drawTo(ctx);
    }
    destroy() {
        this.points.length = 0;
        this.points = null;
        delete this.points;
        this.ptToMove = null;
        delete this.ptToMove;
        super.destroy();
    }
}