const Intersection2DType = {
    NONE: 'None',
    INTERSECTION: 'Intersection',
    OUTSIDE: 'Outside',
    TANGENT: 'Tangent',
    COINCIDENT: 'Coincident',
    INSIDE: 'Inside',
    PARALLEL: 'Parallel'
};
class Intersection2D {
    constructor(interType = Intersection2DType.NONE) {
        this.intersecPt = [];
        this.intersectionType = interType;
    }
    destroy() {
        this.intersecPt.length = 0;
        this.intersecPt = null;
        delete this.intersecPt;
        this.intersectionType = null;
        delete this.intersectionType;
    }
    appendPoint(pt) {
        this.intersecPt = [...this.intersecPt, pt];
    }
    appendPoints(pts) {
        this.intersecPt = [...this.intersecPt, pts];
    }
    intersectShapes(shape1, shape2) {
        switch (shape1.shapeType) {
            case shapeType.BEZIER2:
                switch (shape2.shapeType) {
                    case shapeType.NONE:
                        break;
                    //stBezier2:intersectBezier2Bezier2()
                    //stBezier3:intersectBezier2Bezier3break;
                    //stCircle:ntersectBezier2Circlebreak;
                    //stEllipse:break;e()
                    //stLine:intersectBezier2Linebreak;
                    //stPolyline:break;lyline()
                    //stPolygon:intersectBezier2Polygonbreak;
                    //stRectangle, stSquare:break;er2Rectangle();
                }
                break;
            case shapeType.BEZIER3:
                switch (shape2.shapeType) {
                    case shapeType.NONE:
                        break;
                    //stBezier2: intersectBezier2Bezier2();
                    //stBezier3: intersectBezier3Bezier3();
                    //stCircle: intersectBezier3Circle();
                    //stEllipse: intersectBezier3Ellipse();
                    //stLine: intersectBezier3Line();
                    //stPolyline: intersectBezier3Polyline();
                    //stPolygon: intersectBezier3Polygon();
                    //stRectangle, stSquare: intersectBezier3Rectangle();
                }
                break;
            case shapeType.CIRCLE:
                switch (shape2.shapeType) {
                    case shapeType.NONE:
                        break;
                    //stBezier2:intersectBezier2Circle();
                    //stBezier3:intersectBezier3Circle();
                    case shapeType.CIRCLE:
                        this.intersectCircleCircle(shape1.center, shape2.center, shape1.r, shape2.r);
                        break;
                    case shapeType.ELLIPSE:
                        this.intersectCircleEllipse(shape1.center, shape2.center, shape1.r, shape2.rxry);
                        break;
                    case shapeType.LINE:
                        this.intersectCircleLine(shape1.center, shape2.firstPoint, shape2.secondPoint, shape1.r);
                        break;
                    case shapeType.POLYLINE:
                        this.intersectCirclePolyline(shape1.center, shape1.r, shape2.points);
                        break;
                    case shapeType.POLYGON:
                        this.intersectCirclePolygon(shape1.center, shape1.r, shape2.points);
                        break;
                    case shapeType.RECTANGLE:
                    case shapeType.SQUARE:
                        this.intersectCircleRectangle(shape1.center, shape2.rect, shape1.r);
                        break;
                }
                break;
            case shapeType.ELLIPSE:
                switch (shape2.shapeType) {
                    case shapeType.NONE:
                        break;
                    //stBezier2:intersectBezier2Ellipse();
                    //stBezier3:intersectBezier3Ellipse();
                    case shapeType.CIRCLE:
                        this.intersectCircleEllipse(shape2.center, shape1.center, shape2.r, shape1.rxry);
                        break;
                    case shapeType.ELLIPSE:
                        this.intersectEllipseEllipse(shape1.center, shape2.center, shape1.rxry, shape2.rxry);
                        break;
                    case shapeType.LINE:
                        this.intersectEllipseLine(shape1.center, shape1.rxry, shape2.firstPoint, shape2.secondPoint);
                        break;
                    case shapeType.POLYLINE:
                        this.intersectEllipsePolyline(shape1.center, shape1.rxry, shape2.points);
                        break;
                    case shapeType.POLYGON:
                        this.intersectEllipsePolygon(shape1.center, shape1.rxry, shape2.points);
                        break;
                    case shapeType.RECTANGLE:
                    case shapeType.SQUARE:
                        this.intersectEllipseRectangle(shape1.center, shape1.rxry, shape2.rect);
                        break;
                }
                break;
            case shapeType.LINE:
                switch (shape2.shapeType) {
                    case shapeType.NONE:
                        break;
                    //stBezier2:intersectBezier2Line();
                    //stBezier3:intersectBezier3Line();
                    case shapeType.CIRCLE:
                        this.intersectCircleLine(shape2.center, shape1.firstPoint, shape1.secondPoint, shape2.r);
                        break;
                    case shapeType.ELLIPSE:
                        this.intersectEllipseLine(shape2.center, shape2.rxry, shape1.firstPoint, shape1.secondPoint);
                        break;
                    case shapeType.LINE:
                        this.intersectLineLine(shape1.firstPoint, shape1.secondPoint, shape2.firstPoint, shape2.secondPoint);
                        break;
                    case shapeType.POLYLINE:
                        this.intersectLinePolyline(shape1.firstPoint, shape1.secondPoint, shape2.points);
                        break;
                    case shapeType.POLYGON:
                        this.intersectLinePolygon(shape1.firstPoint, shape1.secondPoint, shape2.points);
                        break;
                    case shapeType.RECTANGLE:
                    case shapeType.SQUARE:
                        this.intersectLineRectangle(shape1.firstPoint, shape1.secondPoint, shape2.rect);
                        break;
                }
                break;
            case shapeType.POLYLINE:
                switch (shape2.shapeType) {
                    case shapeType.NONE:
                        break;
                    //stBezier2:intersectBezier2Polygon();
                    //stBezier3:intersectBezier3Polygon();
                    case shapeType.CIRCLE:
                        this.intersectCirclePolyline(shape2.center, shape2.r, shape1.points);
                        break;
                    case shapeType.ELLIPSE:
                        this.intersectEllipsePolyline(shape2.center, shape2.rxry, shape1.points);
                        break;
                    case shapeType.LINE:
                        this.intersectLinePolyline(shape2.firstPoint, shape2.secondPoint, shape1.points);
                        break;
                    case shapeType.POLYLINE:
                        this.intersectPolylinePolyline(shape1.points, shape2.points);
                        break;
                    case shapeType.POLYGON:
                        this.intersectPolylinePolygon(shape1.points, shape2.points);
                        break;
                    case shapeType.RECTANGLE:
                    case shapeType.SQUARE:
                        this.intersectPolylineRectangle(shape1.points, shape2.rect);
                        break;
                }
                break;
            case shapeType.POLYGON:
                switch (shape2.shapeType) {
                    case shapeType.NONE:
                        break;
                    //stBezier2:intersectBezier2Polygon();
                    //stBezier3:intersectBezier3Polygon();
                    case shapeType.CIRCLE:
                        this.intersectCirclePolygon(shape2.center, shape2.r, shape1.points);
                        break;
                    case shapeType.Ellipse:
                        this.intersectEllipsePolygon(shape2.center, shape2.rxry, shape1.points);
                        break;
                    case shapeType.LINE:
                        this.intersectLinePolygon(shape2.firstPoint, shape2.secondPoint, shape1.points);
                        break;
                    case shapeType.POLYLINE:
                        this.intersectPolylinePolygon(shape2.points, shape1.points);
                        break;
                    case shapeType.POLYGON:
                        this.intersectPolygonPolygon(shape1.points, shape2.points);
                        break;
                    case shapeType.RECTANGLE:
                    case shapeType.SQUARE:
                        this.intersectPolygonRectangle(shape1.points, shape2.rect);
                        break;
                }
                break;
            case shapeType.Ray:
                switch (shape2.shapeType) {
                    case shapeType.NONE:
                        break;
                    //stRay:intersectRayRay();
                }
                break;
            case shapeType.RECTANGLE:
            case shapeType.SQUARE:
                switch (shape2.shapeType) {
                    case shapeType.NONE:
                        break;
                    //stBezier2:intersectBezier2Rectangle();
                    //stBezier3:intersectBezier3Rectangle();
                    case shapeType.CIRCLE:
                        this.intersectCircleRectangle(shape2.center, shape1.rect, shape2.r);
                        break;
                    case shapeType.ELLIPSE:
                        this.intersectEllipseRectangle(shape2.center, shape2.rxry, shape1.rect);
                        break;
                    case shapeType.LINE:
                        this.intersectLineRectangle(shape2.firstPoint, shape2.secondPoint, shape1.rect);
                        break;
                    case shapeType.POLYLINE:
                        this.intersectPolylineRectangle(shape2.points, shape1.rect);
                        break;
                    case shapeType.POLYGON:
                        this.intersectPolygonRectangle(shape2.points, shape1.rect);
                        break;
                    case shapeType.RECTANGLE:
                    case shapeType.SQUARE:
                        this.intersectRectangleRectangle(shape1.rect, shape2.rect);
                        break;
                }
                break;
        }
    }
    //#region A faire
    intersectPathShape(shape, path) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier2Bezier2(a1, a2, a3, b1, b2, b3) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier2Bezier3(a1, a2, a3, b1, b2, b3, b4) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier2Circle(p1, p2, p3, c, r) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier2Ellipse(p1, p2, p3, ec, rx, ry) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier2Line(p1, p2, p3, a1, a2) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier2Polyline(p1, p2, p3, points) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier2Polygon(p1, p2, p3, points) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier2Rectangle(p1, p2, p3, rec) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier3Bezier3(a1, a2, a3, a4, b1, b2, b3, b4) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier3Circle(p1, p2, p3, p4, c, r) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier3Ellipse(p1, p2, p3, p4, ec, rx, ry) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier3Line(p1, p2, p3, p4, a1, a2) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier3Polyline(p1, p2, p3, p4, points) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier3Polygon(p1, p2, p3, p4, points) {
        this.intersectionType = Intersection2DType.NONE;
    }
    intersectBezier3Rectangle(p1, p2, p3, p4, rec) {
        this.intersectionType = Intersection2DType.NONE;
    }
    //#endregion A faire
    intersectCircleCircle(c1, c2, r1, r2) {
        this.intersectionType = Intersection2DType.NONE;

        // Determine minimum and maximum radii where circles can intersect
        const r_max = r1 + r2;
        const r_min = Math.abs(r1 - r2);

        // Determine actual distance between circle circles
        const c_dist = c1.distanceFrom(c2);

        if (c_dist > r_max) {
            this.intersectionType = Intersection2DType.OUTSIDE;
        } else if (c_dist < r_min) {
            this.intersectionType = Intersection2DType.INSIDE;
        } else {
            this.intersectionType = Intersection2DType.INTERSECTION;

            const a = (r1 * r1 - r2 * r2 + c_dist * c_dist) / (2 * c_dist);
            const h = Math.sqrt(r1 * r1 - a * a);
            const p = c1.lerp(c2, a / c_dist);
            const b = h / c_dist;

            this.intersecPt = [
                ...this.intersecPt,
                new Point2D(
                    p.x - b * (c2.y - c1.y),
                    p.y + b * (c2.x - c1.x)
                ), new Point2D(
                    p.x + b * (c2.y - c1.y),
                    p.y - b * (c2.x - c1.x)
                )
            ];
        }
    }
    intersectCircleEllipse(cc, ec, r, rxry) {
        this.intersectionType = Intersection2DType.NONE;
        const rxry1 = new Point2D(r, r);
        this.intersectEllipseEllipse(cc, ec, rxry1, rxry);
    }
    intersectCircleLine(c, a1, a2, r) {
        this.intersectionType = Intersection2DType.NONE;
        const a = (a2.x - a1.x) * (a2.x - a1.x) +
            (a2.y - a1.y) * (a2.y - a1.y);
        const b = 2 * ((a2.x - a1.x) * (a1.x - c.x) +
            (a2.y - a1.y) * (a1.y - c.y));
        const cc = c.x * c.x + c.y * c.y + a1.x * a1.x + a1.y * a1.y -
            2 * (c.x * a1.x + c.y * a1.y) - r * r;
        const deter = b * b - 4 * a * cc;

        if (deter < 0) {
            this.intersectionType = Intersection2DType.OUTSIDE;
        } else if (deter === 0) {
            this.intersectionType = Intersection2DType.TANGENT;
            // NOTE: should calculate this point
        } else {
            const e = Math.sqrt(deter);
            const u1 = (-b + e) / (2 * a);
            const u2 = (-b - e) / (2 * a);

            if ((u1 < 0) || (u1 > 1) && (u2 < 0) || (u2 > 1)) {
                if (((u1 < 0) && (u2 < 0)) || ((u1 > 1) && (u2 > 1))) {
                    this.intersectionType = Intersection2DType.OUTSIDE;
                } else {
                    this.intersectionType = Intersection2DType.INSIDE;
                }
            } else {
                this.intersectionType = Intersection2DType.INTERSECTION;
                if ((0 <= u1) && (u1 <= 1)) {
                    this.intersecPt = [...this.intersecPt, a1.lerp(a2, u1)];
                }
                if ((0 <= u2) && (u2 <= 1)) {
                    this.intersecPt = [...this.intersecPt, a1.lerp(a2, u2)];
                }
            }
        }
    }
    intersectCirclePolyline(c, r, points) {
        this.intersectionType = Intersection2DType.NONE;
        for (let i = 0; i < points.length - 1; i++) {
            this.intersectCircleLine(c, points[i], points[i + 1], r);
        }
    }
    intersectCirclePolygon(c, r, points) {
        this.intersectionType = Intersection2DType.NONE;
        points.forEach((point, i) => {
            let a2;
            if (i < points.length - 1) {
                a2 = points[i + 1];
            } else {
                a2 = points[0];
            }
            this.intersectCircleLine(c, point, a2, r);
        });
    }
    intersectCircleRectangle(c, rec, r) {
        this.intersectionType = Intersection2DType.NONE;
        let pt = new Point2D(rec.left, rec.top);
        let pt2 = new Point2D(rec.right, rec.top);
        this.intersectCircleLine(c, pt, pt2, r);
        pt = new Point2D(rec.right, rec.top);
        pt2 = new Point2D(rec.right, rec.bottom);
        this.intersectCircleLine(c, pt, pt2, r);
        pt = new Point2D(rec.left, rec.bottom);
        pt2 = new Point2D(rec.right, rec.bottom);
        this.intersectCircleLine(c, pt, pt2, r);
        pt = new Point2D(rec.left, rec.top);
        pt2 = new Point2D(rec.left, rec.bottom);
        this.intersectCircleLine(c, pt, pt2, r);
    }
    intersectEllipseEllipse(c1, c2, rxry1, rxry2) {
        this.intersectionType = Intersection2DType.NONE;
        const a = [
            rxry1.y * rxry1.y,
            0,
            rxry1.x * rxry1.x,
            -2 * rxry1.y * rxry1.y * c1.x,
            -2 * rxry1.x * rxry1.x * c1.y,
            rxry1.y * rxry1.y * c1.x * c1.x + rxry1.x * rxry1.x * c1.y * c1.y - rxry1.x * rxry1.x * rxry1.y * rxry1.y
        ];
        const b = [
            rxry2.y * rxry2.y,
            0,
            rxry2.x * rxry2.x,
            -2 * rxry2.y * rxry2.y * c2.x,
            -2 * rxry2.x * rxry2.x * c2.y,
            rxry2.y * rxry2.y * c2.x * c2.x + rxry2.x * rxry2.x * c2.y * c2.y - rxry2.x * rxry2.x * rxry2.y * rxry2.y
        ];

        const yPoly = this.bezout(a, b);
        const yRoots = yPoly.roots;
        const epsilon = 1e-3;
        const norm0 = (a[0] * a[0] + 2 * a[1] * a[1] + a[2] * a[2]) * epsilon;
        const norm1 = (b[0] * b[0] + 2 * b[1] * b[1] + b[2] * b[2]) * epsilon;
        yRoots.forEach(yRoot => {
            const xPoly = new Polynomial2D([
                a[0],
                a[3] + yRoot * a[1],
                a[5] + yRoot * (a[4] + yRoot * a[2])
            ]);
            const xRoots = xPoly.roots;
            xRoots.forEach(xRoot => {
                let test = (a[0] * xRoot + a[1] * yRoot + a[3]) * xRoot +
                    (a[2] * yRoot + a[4]) * yRoot + a[5];
                if (Math.abs(test) < norm0) {
                    test = (b[0] * xRoot + b[1] * yRoot + b[3]) * xRoot +
                        (b[2] * yRoot + b[4]) * yRoot + b[5];
                }
                if (Math.abs(test) < norm1) {
                    this.appendPoint(new Point2D(xRoot, yRoot));
                }
            });
        });
        this.intersectionType = Intersection2DType.INTERSECTION;
    }
    intersectEllipseLine(c, rxry, a1, a2) {
        this.intersectionType = Intersection2DType.NONE;
        const origin = new Vector2D(a1.x, a1.y);
        const tmp = new Vector2D;
        const dir = tmp.fromPoints(a1, a2);
        const center = new Vector2D(c.x, c.y);
        const diff = origin.subtract(center);
        const mDir = new Vector2D(dir.x / (rxry.x * rxry.x), dir.y / (rxry.y * rxry.y));
        const mDiff = new Vector2D(diff.x / (rxry.x * rxry.x), diff.y / (rxry.y * rxry.y));

        const a = dir.dot(mDir);
        const b = dir.dot(mDiff);
        const c1 = diff.dot(mDiff) - 1.0;
        const d = b * b - a * c1;

        if (d < 0) {
            this.intersectionType = Intersection2DType.OUTSIDE;
        } else if (d > 0) {
            const root = Math.sqrt(d);
            const t_a = (-b - root) / a;
            const t_b = (-b + root) / a;

            if (((t_a < 0) || (1 < t_a)) && ((t_b < 0) || (1 < t_b))) {
                if (((t_a < 0) && (t_b < 0)) || ((t_a > 1) && (t_b > 1))) {
                    this.intersectionType = Intersection2DType.OUTSIDE;
                } else {
                    this.intersectionType = Intersection2DType.INSIDE;
                }
            } else {
                this.intersectionType = Intersection2DType.INTERSECTION;
                if ((0 <= t_a) && (t_a <= 1)) {
                    this.appendPoint(a1.lerp(a2, t_a));
                }
                if ((0 <= t_b) && (t_b <= 1)) {
                    this.appendPoint(a1.lerp(a2, t_b));
                }
            }
        } else {
            const t = -b / a;
            if ((0 <= t) && (t <= 1)) {
                this.intersectionType = Intersection2DType.INTERSECTION;
                this.appendPoint(a1.lerp(a2, t));
            } else {
                this.intersectionType = Intersection2DType.OUTSIDE;
            }
        }
    }
    intersectEllipsePolyline(c, rxry, points) {
        this.intersectionType = Intersection2DType.NONE;
        for (let i = 0; i < points.length - 1; i++) {
            this.intersectEllipseLine(c, rxry, points[i], points[i + 1]);
        }
    }
    intersectEllipsePolygon(c, rxry, points) {
        this.intersectionType = Intersection2DType.NONE;
        points.forEach((point, i) => {
            let b2;
            if (i < points.length - 1) {
                b2 = points[i + 1];
            } else {
                b2 = points[0];
            }
            this.intersectEllipseLine(c, rxry, point, b2);
        });
    }
    intersectEllipseRectangle(c, rxry, rec) {
        this.intersectionType = Intersection2DType.NONE;
        const c1 = new Point2D(c.x, c.y);
        const rxry1 = new Point2D(rxry.x, rxry.y);
        let pt1 = new Point2D(rec.left, rec.top);
        let pt2 = new Point2D(rec.right, rec.top);
        this.intersectEllipseLine(c1, rxry1, pt1, pt2);
        pt1 = new Point2D(rec.right, rec.top);
        pt2 = new Point2D(rec.right, rec.bottom);
        this.intersectEllipseLine(c1, rxry1, pt1, pt2);
        pt1 = new Point2D(rec.left, rec.bottom);
        pt2 = new Point2D(rec.right, rec.bottom);
        this.intersectEllipseLine(c1, rxry1, pt1, pt2);
        pt1 = new Point2D(rec.left, rec.top);
        pt2 = new Point2D(rec.left, rec.bottom);
        this.intersectEllipseLine(new Point2D(c.x, c.y), rxry1, pt1, pt2);
    }
    intersectLineLine(a1, a2, b1, b2) {
        this.intersectionType = Intersection2DType.NONE;
        const ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
        const ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
        const u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

        if (u_b !== 0) {
            const ua = ua_t / u_b;
            const ub = ub_t / u_b;

            if ((0 <= ua) && (ua <= 1) && (0 <= ub) && (ub <= 1)) {
                this.intersectionType = Intersection2DType.INTERSECTION;
                this.intersecPt = [
                    ...this.intersecPt,
                    new Point2D(
                        a1.x + ua * (a2.x - a1.x),
                        a1.y + ua * (a2.y - a1.y)
                    )
                ];
            }
        } else {
            if ((ua_t === 0) || (ub_t === 0)) {
                this.intersectionType = Intersection2DType.COINCIDENT
            } else {
                this.intersectionType = Intersection2DType.PARALLEL;
            }
        }
    }
    intersectLinePolyline(a1, a2, points) {
        this.intersectionType = Intersection2DType.NONE;
        for (let i = 0; i < points.length - 1; i++) {
            this.intersectLineLine(a1, a2, points[i], points[i + 1]);
        }
    }
    intersectLinePolygon(a1, a2, points) {
        this.intersectionType = Intersection2DType.NONE;
        points.forEach((point, i) => {
            let b2;
            if (i < points.length - 1) {
                b2 = points[i + 1];
            } else {
                b2 = points[0];
            }
            this.intersectLineLine(a1, a2, point, b2);
        });
    }
    intersectLineRectangle(a1, a2, rec) {
        this.intersectionType = Intersection2DType.NONE;
        let pt1 = new Point2D(rec.left, rec.top);
        let pt2 = new Point2D(rec.right, rec.top);
        this.intersectLineLine(pt1, pt2, a1, a2);
        pt1 = new Point2D(rec.right, rec.top);
        pt2 = new Point2D(rec.right, rec.bottom);
        this.intersectLineLine(pt1, pt2, a1, a2);
        pt1 = new Point2D(rec.left, rec.bottom);
        pt2 = new Point2D(rec.right, rec.bottom);
        this.intersectLineLine(pt1, pt2, a1, a2);
        pt1 = new Point2D(rec.left, rec.top);
        pt2 = new Point2D(rec.left, rec.bottom);
        this.intersectLineLine(pt1, pt2, a1, a2);
    }
    intersectPolylinePolyline(points1, points2) {
        this.intersectionType = Intersection2DType.NONE;
        for (let i = 0; i < points1.length - 1; i++) {
            this.intersectLinePolyline(points1[i], points1[i + 1], points2);
        }
    }
    intersectPolylinePolygon(points1, points2) {
        this.intersectionType = Intersection2DType.NONE;
        for (let i = 0; i < points1.length - 1; i++) {
            this.intersectLinePolygon(points1[i], points1[i + 1], points2);
        }
    }
    intersectPolygonPolygon(points1, points2) {
        this.intersectionType = Intersection2DType.NONE;
        points1.forEach((point, i) => {
            let a2;
            if (i < points1.length - 1) {
                a2 = points1[i + 1];
            } else {
                a2 = points1[0];
            }
            this.intersectLinePolygon(point, a2, points2);
        });
    }
    intersectPolylineRectangle(points, rec) {
        this.intersectionType = Intersection2DType.NONE;
        let pt1 = new Point2D(rec.left, rec.top);
        let pt2 = new Point2D(rec.right, rec.top);
        this.intersectLinePolyline(pt1, pt2, points);
        pt1 = new Point2D(rec.right, rec.top);
        pt2 = new Point2D(rec.right, rec.bottom);
        this.intersectLinePolyline(pt1, pt2, points);
        pt1 = new Point2D(rec.left, rec.bottom);
        pt2 = new Point2D(rec.right, rec.bottom);
        this.intersectLinePolyline(pt1, pt2, points);
        pt1 = new Point2D(rec.left, rec.top);
        pt2 = new Point2D(rec.left, rec.bottom);
        this.intersectLinePolyline(pt1, pt2, points);
    }
    intersectPolygonRectangle(points, rec) {
        this.intersectionType = Intersection2DType.NONE;
        let pt1 = new Point2D(rec.left, rec.top);
        let pt2 = new Point2D(rec.right, rec.top);
        this.intersectLinePolygon(pt1, pt2, points);
        pt1 = new Point2D(rec.right, rec.top);
        pt2 = new Point2D(rec.right, rec.bottom);
        this.intersectLinePolygon(pt1, pt2, points);
        pt1 = new Point2D(rec.left, rec.bottom);
        pt2 = new Point2D(rec.right, rec.bottom);
        this.intersectLinePolygon(pt1, pt2, points);
        pt1 = new Point2D(rec.left, rec.top);
        pt2 = new Point2D(rec.left, rec.bottom);
        this.intersectLinePolygon(pt1, pt2, points);
    }

    intersectRayRay(a1, a2, b1, b2) {
        this.intersectionType = Intersection2DType.NONE;
        const ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
        const ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
        const u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

        if (u_b !== 0) {
            const ua = ua_t / u_b;

            this.intersecPt = [
                ...this.intersecPt,
                new Point2D(
                    a1.x + ua * (a2.x - a1.x),
                    a1.y + ua * (a2.y - a1.y)
                )
            ];
        } else {
            if ((ua_t = 0) || (ub_t = 0)) {
                this.intersectionType = Intersection2DType.COINCIDENT;
            } else {
                this.intersectionType = Intersection2DType.PARALLEL;
            }
        }
    }
    intersectRectangleRectangle(rec1, rec2) {
        this.intersectionType = Intersection2DType.NONE;
        let pt1 = new Point2D(rec1.left, rec1.top);
        let pt2 = new Point2D(rec1.right, rec1.top);
        this.intersectLineRectangle(pt1, pt2, rec2);
        pt1 = new Point2D(rec1.right, rec1.top);
        pt2 = new Point2D(rec1.right, rec1.bottom);
        this.intersectLineRectangle(pt1, pt2, rec2);
        pt1 = new Point2D(rec1.left, rec1.bottom);
        pt2 = new Point2D(rec1.right, rec1.bottom);
        this.intersectLineRectangle(pt1, pt2, rec2);
        pt1 = new Point2D(rec1.left, rec1.top);
        pt2 = new Point2D(rec1.left, rec1.bottom);
        this.intersectLineRectangle(pt1, pt2, rec2);
    }

    bezout(e1, e2) {
        const ab = e1[0] * e2[1] - e2[0] * e1[1];
        const ac = e1[0] * e2[2] - e2[0] * e1[2];
        const ad = e1[0] * e2[3] - e2[0] * e1[3];
        const ae = e1[0] * e2[4] - e2[0] * e1[4];
        const af = e1[0] * e2[5] - e2[0] * e1[5];
        const bc = e1[1] * e2[2] - e2[1] * e1[2];
        const be = e1[1] * e2[4] - e2[1] * e1[4];
        const bf = e1[1] * e2[5] - e2[1] * e1[5];
        const cd = e1[2] * e2[3] - e2[2] * e1[3];
        const de = e1[3] * e2[4] - e2[3] * e1[4];
        const df = e1[3] * e2[5] - e2[3] * e1[5];
        const BFpDE = bf + de;
        const BEmCD = be - cd;

        const list = [
            ad * df - af * af,
            ab * df + ad * BFpDE - 2 * ae * af,
            ab * BFpDE + ad * BEmCD - ae * ae - 2 * ac * af,
            ab * BEmCD + ad * bc - 2 * ac * ae,
            ab * bc - ac * ac
        ];
        return new Polynomial2D(list);
    }
}