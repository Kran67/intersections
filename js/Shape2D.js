const shapeType = {
    NONE: 'None',
    LINE: 'Line',
    CIRCLE: 'Circle',
    ELLIPSE: 'Ellipse',
    RECTANGLE: 'Rectangle',
    SQUARE: 'Square',
    POLYLINE: 'PolyLine',
    POLYGON: 'Polygon',
    BEZIER2: 'Bezier2',
    BEZIER3: 'Bezier3',
    RAY: 'Ray'
};
class Shape2D {
    constructor(transparent = false) {
        this.fillStyle = '#ffffff';
        this.strokeStyle = '#000000';
        this._rect = new Rect2D;
        this._selected = false;
        this.handleW = 3;
        this.shapeType = shapeType.NONE;
        this.transparent = transparent;
        this.zoomFactor = 1;
        this.htmlElement = null;
    }
    get rect() {
        return this._rect;
    }
    get selected() {
        return this._selected;
    }
    set selected(newValue) {
        this._selected = newValue;
        this.htmlElement.classList.remove('selected');
        if (this._selected) {
            this.htmlElement.classList.add('selected');
        }
        redrawCanvas();
    }
    destroy() {
        this.rect.destroy();
        this.fillStyle = null;
        this.strokeStyle = null;
        this.rect = null;
        this.selected = null;
        this.handleW = null;
        this.shapeType = null;
        this.transparent = null;
        this.zoomFactor = null;
        delete this.fillStyle;
        delete this.strokeStyle;
        delete this.rect;
        delete this.selected;
        delete this.handleW;
        delete this.shapeType;
        delete this.transparent;
        delete this.zoomFactor;
    }
    colors(strokeStyle, fillStyle) {
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
    }
    selStart(x, y) {
        this.rect.left = x;
        this.rect.top = y;
    }
    selEnd(x, y, reArrange = false) {
        if (reArrange) {
            if (x < this.rect.left) {
                [this.rect.left, this.rect.right] = [x, this.rect.left];
            } else {
                this.rect.right = x;
            }
            if (y < this.rect.top) {
                [this.rect.top, this.rect.bottom] = [y, this.rect.top];
            } else {
                this.rect.bottom = y;
            }
        } else {
            this.rect.right = x;
            this.rect.bottom = y;
        }
    }
    moveBy(x, y) {
        switch (this.shapeType) {
            case shapeType.NONE:
            case shapeType.LINE:
            case shapeType.CIRCLE:
            case shapeType.ELLIPSE:
            case shapeType.RECTANGLE:
            case shapeType.SQUARE:
                this.rect.top += y;
                this.rect.left += x;
                this.rect.right += x;
                this.rect.bottom += y;
                break;
            case shapeType.POLYLINE:
            case shapeType.POLYGON:
                this.points.forEach(point => {
                    point.x += x;
                    point.y += y;
                });
                break;
        }
    }
    drawTo(ctx) {
        const handleW2 = this.handleW * 2;
        if (this.selected) {
            ctx.save();
            ctx.strokeStyle = 'black';
            ctx.setLineDash([5, 5]);
            switch (this.shapeType) {
                case shapeType.CIRCLE:
                case shapeType.ELLIPSE:
                case shapeType.RECTANGLE:
                case shapeType.SQUARE:
                    ctx.strokeRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);
                    break;
            }
            ctx.restore();
            const hMid = ~~(this.rect.left + (this.rect.width / 2));
            const vMid = ~~(this.rect.top + (this.rect.height / 2));
            switch (this.shapeType) {
                case shapeType.LINE:
                    ctx.fillRect(this.rect.left - this.handleW - 0.5, this.rect.top - this.handleW - 0.5,
                        handleW2, handleW2);
                    ctx.fillRect(this.rect.right - this.handleW - 0.5, this.rect.bottom - this.handleW - 0.5,
                        handleW2, handleW2);
                    break;
                case shapeType.CIRCLE:
                case shapeType.SQUARE:
                case shapeType.ELLIPSE:
                case shapeType.RECTANGLE:
                    // Top/Right
                    ctx.fillRect(this.rect.left - this.handleW - 0.5, this.rect.top - this.handleW - 0.5,
                        handleW2, handleW2);
                    // Bottom/Right
                    ctx.fillRect(this.rect.left - this.handleW - 0.5, this.rect.bottom - this.handleW - 0.5,
                        handleW2, handleW2);
                    // Top/Left
                    ctx.fillRect(this.rect.right - this.handleW - 0.5, this.rect.top - this.handleW - 0.5,
                        handleW2, handleW2);
                    // Bottom/Left
                    ctx.fillRect(this.rect.right - this.handleW - 0.5, this.rect.bottom - this.handleW - 0.5,
                        handleW2, handleW2);
                    if ([shapeType.ELLIPSE, shapeType.RECTANGLE].indexOf(this.shapeType) > -1) {
                        // Middle/Left
                        ctx.fillRect(this.rect.left - this.handleW - 0.5, vMid - this.handleW - 0.5,
                            handleW2, handleW2);
                        // Top/Middle
                        ctx.fillRect(hMid - this.handleW - 0.5, this.rect.top - this.handleW - 0.5, handleW2,
                            handleW2);
                        // Middle/Right
                        ctx.fillRect(this.rect.right - this.handleW - 0.5, vMid - this.handleW - 0.5,
                            handleW2, handleW2);
                        // Middle/Bottom
                        ctx.fillRect(hMid - this.handleW - 0.5, this.rect.bottom - this.handleW - 0.5, handleW2,
                            handleW2);
                    }
                    break;
                case shapeType.POLYLINE:
                case shapeType.POLYGON:
                    this.points.forEach(point => {
                        ctx.fillRect(point.x - this.handleW - 0.5, point.y - this.handleW - 0.5, handleW2, handleW2);
                    });
                    break;
                case shapeType.BEZIER2:
                case shapeType.BEZIER3:
                    break;
                case shapeType.RAY:
                    break;
            }
        }

    }
    select(x, y) {
        return this.selected = this.ptInShape(x, y);
    }
    unSelect() {
        return this.selected = false;
    }
    handleAt(x, y) {
        let result = -1;
        const hMid = this.rect.left + (this.rect.width / 2);
        const vMid = this.rect.top + (this.rect.height / 2);
        switch (this.shapeType) {
            case shapeType.NONE:
            case shapeType.LINE:
            case shapeType.CIRCLE:
            case shapeType.ELLIPSE:
            case shapeType.RECTANGLE:
            case shapeType.SQUARE:
                if (Math.abs(this.rect.top - y) < this.handleW) { // top line
                    if (Math.abs(this.rect.left - x) < this.handleW) {
                        result = 0;
                    } else if (Math.abs(hMid - x) < this.handleW) {
                        result = 1;
                    } else if (Math.abs(this.rect.right - x) < this.handleW) {
                        result = 2;
                    }
                } else if (Math.abs(this.rect.right - x) < this.handleW) { // right line
                    if (Math.abs(vMid - y) < this.handleW) {
                        result = 3;
                    } else if (Math.abs(this.rect.bottom - y) < this.handleW) {
                        result = 4;
                    }
                } else if (Math.abs(this.rect.bottom - y) < this.handleW) { // bottom line
                    if (Math.abs(hMid - x) < this.handleW) {
                        result = 5;
                    } else if (Math.abs(this.rect.left - x) < this.handleW) {
                        result = 6;
                    }
                } else if (Math.abs(this.rect.left - x) < this.handleW) { // left line (last chance)
                    if (Math.abs(vMid - y) < this.handleW) {
                        result = 7;
                    }
                } else if ((((x >= this.rect.left) && (x <= this.rect.right)) ||
                    ((x <= this.rect.left) && (x >= this.rect.right))) && (((y >= this.rect.top)
                        && (y <= this.rect.bottom)) || ((y <= this.rect.top) && (y >= this.rect.bottom)))) {
                    if (this.ptInShape(x, y)) {
                        result = 8;
                    }
                }
                break;
            case shapeType.POLYLINE:
            case shapeType.POLYGON:
                for (let i = 0; i < this.points.length; i++) {
                    const pt1 = this.points[i];
                    if ((x >= pt1.x - this.handleW) && (x <= pt1.x + this.handleW) &&
                        (y >= pt1.y - this.handleW) && (y <= pt1.y + this.handleW)) {
                        result = 9;
                        this.ptToMove = i;
                        break;
                    }
                }
                if (result === -1) {
                    if (this.ptInShape(x, y)) {
                        result = 8;
                    }
                }
                break;
        }
        return result;
    }
    ptInShape(x, y) {
        let l, r, s, rec, x0, y0, a, b;
        const ptInPoly = (pts, x, y) => {
            let c = 0;
            let j = pts.length-1;
            for (let i = 0; i < pts.length; i++) {
                if ((((pts[i].y <= y) && (y < pts[j].y)) || ((pts[j].y <= y) && (y < pts[i].y))) &&
                    (x < (pts[j].x - pts[i].x) * (y - pts[i].y) / (pts[j].y - pts[i].y) + pts[i].x)) {
                    if (c === 0) {
                        c = 1;
                    } else {
                        c = 0;
                    }
                }
                j = i;
            }
            return c !== 0;
        };
        const tolerance = 4;
        switch (this.shapeType) {
            case shapeType.NONE:
                return false;
            case shapeType.LINE:
                l = Math.sqrt(((this.rect.right - this.rect.left) * (this.rect.right - this.rect.left) +
                    (this.rect.bottom - this.rect.top) * (this.rect.bottom - this.rect.top)));
                if (l !== 0) {
                    r = ((this.rect.top - y) * (this.rect.top - this.rect.bottom) - (this.rect.left - x) * (this.rect.right - this.rect.left)) / (l * l);
                    s = ((this.rect.top - y) * (this.rect.right - this.rect.left) - (this.rect.left - x) * (this.rect.bottom - this.rect.top)) / (l * l);
                    if ((r > 0) && (r < 1)) {
                        if (Math.abs(s * l) <= tolerance) {
                            return true;  //s*l=distance
                        }
                    }
                }
                break;
            case shapeType.CIRCLE:
            case shapeType.ELLIPSE:
                rec = this.rect;
                x0 = (rec.left + rec.right) / 2;
                y0 = (rec.top + rec.bottom) / 2;
                a = (rec.right - rec.left) / 2;
                b = (rec.bottom - rec.top) / 2;
                if (Math.pow((x - x0) / a, 2) + Math.pow((y - y0) / b, 2) <= 1.0) {
                    return true;
                }
                break;
            case shapeType.RECTANGLE:
            case shapeType.SQUARE:
                if ((x >= this.rect.left) && (x <= this.rect.right) && (y >= this.rect.top) && (y <= this.rect.bottom)) {
                    return true;
                }
                break;
            case shapeType.POLYLINE:
                for (let i = 0; i < this.points.length - 1; i++) {
                    const pt1 = this.points[i];
                    const pt2 = this.points[i + 1];
                    l = Math.sqrt(((pt2.x - pt1.x) * (pt2.x - pt1.x) + (pt2.y - pt1.y) * (pt2.y - pt1.y)));
                    if (l !== 0) {
                        r = ((pt1.y - y) * (pt1.y - pt2.y) - (pt1.x - x) * (pt2.x - pt1.x)) / (l * l);
                        s = ((pt1.y - y) * (pt2.x - pt1.x) - (pt1.x - x) * (pt2.y - pt1.y)) / (l * l);
                        if ((r > 0) && (r < 1)) {
                            if (Math.abs(s * l) <= tolerance) {
                                return true;  //s*l=distance
                            }
                        }
                    }
                }
                break;
            case shapeType.POLYGON:
                if (ptInPoly(this.points, x, y)) {
                    return true;
                }
                break;
        }
    }
    inflateShape(zFact) {
        if (this.zoomFactor !== zFact) {
            this.zoomFactor = zFact;
            const rec = this.rect;
            const midx = Math.trunc(rec.left) + ((Math.trunc(rec.right) - Math.trunc(rec.left)) / 2);
            const midy = Math.trunc(rec.top) + ((Math.trunc(rec.bottom) - Math.trunc(rec.top)) / 2);
            switch (this.shapeType) {
                case shapeType.NONE:
                case shapeType.LINE:
                case shapeType.CIRCLE:
                case shapeType.ELLIPSE:
                case shapeType.RECTANGLE:
                case shapeType.SQUARE:
                    this.rect.left = Math.floor((this.rect.left - midx) * (1 - zfact / 100) + midx);
                    this.rect.top = Math.floor((this.rect.top - midy) * (1 - zfact / 100) + midy);
                    this.rect.right = Math.floor((this.rect.right - midx) * (1 - zfact / 100) + midx);
                    this.rect.bottom = Math.floor((this.rect.bottom - midy) * (1 - zfact / 100) + midy);
                    break; //InflateRect(fRect, Zfact, ZFact);
                case shapeType.POLYLINE:
                case shapeType.POLYGON:
                    this.points.forEach(pt => {
                        pt.x = (pt.fx - midx) * (1 - zfact / 100) + midx;
                        pt.y = (pt.fy - midy) * (1 - zfact / 100) + midy;
                    });
                    break;
            }
        }
    }
}