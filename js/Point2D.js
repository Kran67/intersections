class Point2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y
    }
    fromPoint(point) {
        this.x = point.x;
        this.y = point.y;
    }
    add(point) {
        return new Point2D(this.x + point.x, this.y + point.y);
    }
    addEquals(point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    }
    scalarAdd(scalar) {
        return new Point2D(this.x + scalar, this.y + scalar);
    }
    scalarAddEquals(scalar) {
        this.x += scalar;
        this.y += scalar;
        return this;
    }
    subtract(point) {
        return new Point2D(this.x - point.x, this.y - point.y);
    }
    subtractEquals(point) {
        this.x -= point.x;
        this.y -= point.y;
        return this;
    }
    scalarSubtract(scalar) {
        return new Point2D(this.x - scalar, this.y - scalar);
    }
    scalarSubtractEquals(scalar) {
        this.x -= scalar;
        this.y -= scalar;
        return this;
    }
    multiply(scalar) {
        return new Point2D(this.x * scalar, this.y * scalar);
    }
    multiplyEquals(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    divide(scalar) {
        return Point2D(this.x / scalar, this.y / scalar);
    }
    divideEquals(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    eq(point) {
        return this.x === point.x && this.y === point.y;
    }
    lt(point) {
        return this.x < point.x && this.y < point.y;
    }
    lte(point) {
        return this.x <= point.x && this.y <= point.y;
    }
    gt(point) {
        return this.x > point.x && this.y > point.y;
    }
    gte(point) {
        return this.x >= point.x && this.y >= point.y;
    }
    lerp(point, t) {
        return new Point2D(this.x + (point.x - this.x) * t, this.y + (point.y - this.y) * t);
    }
    distanceFrom(point) {
        const dx = this.x - point.x;
        const dy = this.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    min(point) {
        return new Point2D(Math.min(this.x, point.x), Math.min(this.y, point.y));
    }
    max(point) {
        return new Point2D(Math.max(this.x, point.x), Math.max(this.y, point.y));
    }
    swap(point) {
        let x, y;
        [x, y] = [this.x, this.y]
        [this.x, this.y] = [point.x, point.y];
        [point.x, point.y] = [x, y];
    }
}