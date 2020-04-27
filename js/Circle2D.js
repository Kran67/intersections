class Circle2D extends Ellipse2D {
    constructor(transparent) {
        super(transparent);
        this.shapeType = shapeType.CIRCLE;
    }
    get r() {
        const center = this.center;
        const rec = this.rect;
        return center.x - rec.left;
    }
}