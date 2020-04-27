class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get vunit() {
        return this.divide(this.length);
    }
    get unitEquals() {
        return this.divideEquals(this.length);
    }
    get perp() {
        return new Vector2D(-this.y, this.x);
    }
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    cross(vec) {
        return this.x * this.y - vec.y * vec.x;
    }
    add(vec) {
        return new Vector2D(this.x + vec.x, this.y + vec.y);
    }
    addEquals(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }
    subtract(vec) {
        return new Vector2D(this.x - vec.x, this.y - vec.y);
    }
    subtractEquals(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }
    multiply(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }
    multiplyEquals(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    divide(scalar) {
        return new Vector2D(this.x / scalar, this.y / scalar);
    }
    divideEquals(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    fromPoints(point1, point2) {
        return new Vector2D(point2.x - point1.x, point2.y - point1.y);
    }
}