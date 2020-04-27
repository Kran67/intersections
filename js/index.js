if (!Array.prototype.swap) {
    /**
     * Swap two element in the Array/Collection
     * @param       {Number}        x       The first index
     * @param       {Number}        y       The second index
     * @returns     {Array}         The current Array/Collection
     */
    Array.prototype.swap = function (x, y) {
        if (x < 0 || x > this.length - 1 || y < 0 || y > this.length - 1) {
            return this;
        }
        const b = this[x];
        this[x] = this[y];
        this[y] = b;
        return this;
    };
}

let canvas;
let ctx;
let shapes = [];
let func = 0;
let shape = null;
let shapeMove = -1;
let down = false;
let shapesList;
let viewIntersections;
let viewTransparency;
let backColor;
let strokeColor;

function resetBtns() {
    document.querySelectorAll('.btn.selected').forEach(btn => {
        btn.classList.remove('selected');
    });
}

function redrawCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    shapes.forEach(shape => {
        shape.drawTo(ctx);
    });
    if (viewIntersections.checked) {
        getIntersection();
    }
}

function resizeCanvas() {
    canvas.width = document.body.offsetWidth - 180;
    canvas.height = document.body.offsetHeight - 30;
    canvas.style.width = 'auto';
    canvas.style.height = 'auto';
    redrawCanvas();
}
function selectShapeInList() {
    this.parentNode.querySelectorAll('.selected').forEach(element => {
        element.shape.selected = false;
    });
    this.shape.selected = true;
}
function createDiv(shape) {
    const div = document.createElement('div');
    div.innerHTML = shape.shapeType;
    div.shape = shape;
    div.className = `shape${shape.selected ? ' selected' : ''}`;
    shape.htmlElement = div;
    div.addEventListener('click', selectShapeInList);
    document.getElementById('shapesList').appendChild(div);
}

function bringToFront() {
    if (shape) {
        const index = shapes.indexOf(shape);
        if (index < shapes.length) {
            shapes = shapes.swap(index, index - 1);
            shapesList.innerHTML = '';
            shapes.forEach(shape => {
                createDiv(shape);
            });
            redrawCanvas();
        }
    }
}

function sendToBack() {
    if (shape) {
        const index = shapes.indexOf(shape);
        if (index < shapes.length) {
            shapes = shapes.swap(index, index + 1);
            redrawCanvas();
            shapesList.innerHTML = '';
            shapes.forEach(shape => {
                createDiv(shape);
            });
        }
    }
}

function selectShapeForme() {
    resetBtns();
    if (shape) {
        shape.selected = false;
        shape.unSelect();
    }
    shape = null;
    func = ~~this.dataset.func;
    this.classList.add('selected');
}

function setTransparency() {
    if (shape) {
        shape.transparent = this.checked;
    }
    redrawCanvas();
}

function getIntersection() {
    if (!shape) {
        return;
    }
    const intersecs = new Intersection2D;
    ctx.save();
    shapes.forEach(Shape => {
        if (Shape !== shape) {
            intersecs.intersecPt.length = 0;
            intersecs.intersectShapes(shape, Shape);
            intersecs.intersecPt.forEach(item => {
                ctx.strokeStyle = 'red';
                ctx.beginPath();
                ctx.ellipse(item.x, item.y, 3, 3, 0, 0, 2 * Math.PI);
                ctx.stroke();
            });
        }
    });
    ctx.restore();
}

function scaleUp() {
    ctx.scale(2, 2);
    redrawCanvas();
}

function scaleDown() {
    ctx.scale(0.5, 0.5);
    redrawCanvas();
}

function setBackColor() {
    if (shape) {
        shape.fillStyle = this.value;
        redrawCanvas();
    }
}

function setStrokeColor() {
    if (shape) {
        shape.strokeStyle = this.value;
        redrawCanvas();
    }
}

function mouseDown(event) {
    if (event.target !== canvas) {
        return;
    }
    const x = event.pageX;
    const y = event.pageY;
    downX = x;
    downY = y;

    if (func === 0) { // select/modify
        if (shape) {
            shapeMove = shape.handleAt(x, y); // an handle ?
            if (shapeMove >= 0) {
                return;
            }
            shape.unSelect();
        }
        findShape(x, y);
        if (shape) {
            backColor.value = shape.fillStyle;
            strokeColor.value = shape.strokeStyle;
            shapeMove = 8;
        } else {
            backColor.value = '#000000';
            strokeColor.value = '#000000';
        }
        redrawCanvas();
        return;
    }

    down = true;
    switch (func) {
        case 1:
            shape = new Line2D;
            break;
        case 2:
            shape = new Circle2D(true);
            break;
        case 3:
            shape = new Ellipse2D(false);
            break;
        case 4:
            shape = new Rectangle2D(true);
            break;
        case 5:
            shape = new Square2D(false);
            break;
    }
    shape.selStart(x, y);
    shape.selEnd(x, y);
    shapes = [...shapes, shape];
    createDiv(shape, true);
    shape.select(x, y);
}

function mouseMove(event) {
    if (event.target !== canvas) {
        return;
    }
    const x = event.pageX;
    const y = event.pageY;
    if (down) {
        shape.selEnd(x, y);
    }
    if (shape && shapeMove >= 0) {
        switch (shapeMove) {
            case 0:
                shape.selStart(x, y);
                break;
            case 1:
                shape.rect.top = y;
                break;
            case 2:
                shape.rect.right = x;
                shape.rect.top = y;
                break;
            case 3:
                shape.rect.right = x;
                break;
            case 4:
                switch (shape.shapeType) {
                    case shapeType.CIRCLE:
                    case shapeType.SQUARE:
                        if (x - shape.rect.right > y - shape.rect.bottom) {
                            shape.selEnd(x, shape.rect.bottom + (x - shape.rect.right));
                        } else {
                            shape.selEnd(shape.rect.right + (y - shape.rect.bottom), y);
                        }
                        break;
                    default:
                        shape.selEnd(x, y);
                }
                break;
            case 5:
                shape.rect.bottom = y;
                break;
            case 6:
                switch (shape.shapeType) {
                    case shapeType.CIRCLE:
                    case shapeType.SQUARE:
                        if (shape.rect.left - x > shape.rect.bottom - y) {
                            shape.rect.bottom += shape.rect.left - x;
                            shape.rect.left = x;
                        } else {
                            shape.rect.left += shape.rect.bottom - y;
                            shape.rect.bottom = y;
                        }
                        break;
                    default:
                        shape.rect.left = x;
                        shape.rect.bottom = y;
                }
                break;
            case 7:
                shape.rect.left = x;
                break;
            case 8:
                shape.moveBy(x - downX, y - downY);
                downX = x;
                downY = y;
                break;
            case 9:
                shape.points[shape.ptToMove].x = x;
                shape.points[shape.ptToMove].y = y;
                break;
        }
    }
    if (down || (shape && shapeMove >= 0)) {
        redrawCanvas();
    }
}

function mouseUp(event) {
    if (event.target !== canvas) {
        return;
    }
    const x = event.pageX;
    const y = event.pageY;
    if (down) {
        down = false;
        func = 0;
        shape.selEnd(x, y, true);
        viewTransparency.checked = shape.transparent;
        backColor.value = shape.fillStyle;
        strokeColor.value = shape.strokeStyle;
        shape.select(x, y);
        shape.selected = true;
        redrawCanvas();
    }
    shapeMove = -1;
    if (shape && viewIntersections.checked) {
        getIntersection(shape);
    }
    resetBtns();
    document.getElementById('emptyBtn').classList.add('selected');
}

function findShape(x, y) {
    let _shapes = shapes.filter(shape => { return shape.select(x, y) });
    if (_shapes.length > 0) {
        shape = _shapes[0];
        shapes.forEach(shape => { shape.selected = false; });
        shape.selected = true;
        viewTransparency.checked = shape.transparent;
    } else {
        shape = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove);
    document.getElementById('upBtn').addEventListener('click', bringToFront);
    document.getElementById('downBtn').addEventListener('click', sendToBack);
    canvas = document.getElementById('canvas');
    viewIntersections = document.getElementById('ViewIntersections');
    viewTransparency = document.getElementById('ViewTransparency');
    shapesList = document.getElementById('shapesList');
    window.addEventListener('resize', resizeCanvas);
    viewIntersections.addEventListener('change', redrawCanvas);
    document.getElementById('emptyBtn').addEventListener('click', selectShapeForme);
    document.getElementById('lineBtn').addEventListener('click', selectShapeForme);
    document.getElementById('circleBtn').addEventListener('click', selectShapeForme);
    document.getElementById('diskBtn').addEventListener('click', selectShapeForme);
    document.getElementById('rectangleBtn').addEventListener('click', selectShapeForme);
    document.getElementById('sqaureBtn').addEventListener('click', selectShapeForme);
    viewTransparency.addEventListener('change', setTransparency);
    backColor = document.getElementById('backColor');
    backColor.addEventListener('change', setBackColor);
    strokeColor = document.getElementById('strokeColor');
    strokeColor.addEventListener('change', setStrokeColor);
    //document.getElementById('plusBtn').addEventListener('click', scaleUp);
    //document.getElementById('minusBtn').addEventListener('click', scaleDown);
    ctx = canvas.getContext('2d');
    resizeCanvas();
    ctx.imageSmoothingEnabled = false;
    ctx.translate(0.5, 0.5);
    let shape = new Line2D(10, 10, 100, 100);
    shapes = [...shapes, shape];
    createDiv(shape);
    shape = new Circle2D;
    shape.rect.left = 10;
    shape.rect.top = 10;
    shape.rect.right = 100;
    shape.rect.bottom = 100;
    shapes = [...shapes, shape];
    createDiv(shape);
    shape = new Ellipse2D;
    shape.rect.left = 110;
    shape.rect.top = 10;
    shape.rect.right = 210;
    shape.rect.bottom = 200;
    shapes = [...shapes, shape];
    createDiv(shape);
    shape = new Rectangle2D;
    shape.rect.left = 220;
    shape.rect.top = 10;
    shape.rect.right = 320;
    shape.rect.bottom = 200;
    shapes = [...shapes, shape];
    createDiv(shape);
    shape = new Square2D;
    shape.rect.left = 330;
    shape.rect.top = 10;
    shape.rect.right = 420;
    shape.rect.bottom = 100;
    shapes = [...shapes, shape];
    createDiv(shape);
    shape = new Polygon2D(false, [new Point2D(440, 10), new Point2D(500, 60), new Point2D(440, 100)]);
    shapes = [...shapes, shape];
    createDiv(shape);
    shape = new Polyline2D(false, [new Point2D(10, 200), new Point2D(100, 200), new Point2D(10, 300), new Point2D(100, 300)]);
    shapes = [...shapes, shape];
    createDiv(shape);
    redrawCanvas();
});
