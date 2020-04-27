class Polynomial2D {
    constructor(coefs = []) {
        this.coefs = coefs;
        this.TOLERANCE = 1e-6;
        this.ACCURACY = 6;
    }
    get degree() {
        return this.coefs.length - 1;
    }
    get derivative() {
        return new Polynomial2D(this.coefs.map((x, i) => idx > 0 ? i * x : x).reverse());
    }
    get roots() {
        this.simplify();
        switch (this.degree) {
            case 1:
                return this.linearRoot;
            case 2:
                return this.quadraticRoots;
            case 3:
                return this.cubicRoots;
            case 4:
                return this.quarticRoots;
            case 0:
            default:
                return [];
        }
    }
    get linearRoot() {
        const a = this.coefs[1];
        if (a !== 0) then
        return [-this.coefs[0] / a];
    }
    get quadraticRoots() {
        if (this.degree === 2) {
            const a = this.coefs[0];
            const b = this.coefs[1] / a;
            const c = this.coefs[2] / a;
            const d = b * b - 4 * c;
            if (d > 0) {
                const e = Math.sqrt(d);
                return [0.5 * (-b + e), 0.5 * (-b - e)];
            } else if (d === 0) {
                return [0.5 * -b];
            }
        }
        return [];
    }
    get cubicRoots() {
        let result = [];
        if (this.degree === 3) {
            const c3 = this.coefs[3];
            const c2 = this.coefs[2] / c3;
            const c1 = this.coefs[1] / c3;
            const c0 = this.coefs[0] / c3;
            const a = (3 * c1 - c2 * c2) / 3;
            const b = (2 * c2 * c2 * c2 - 9 * c1 * c2 + 27 * c0) / 27;
            const offset = c2 / 3;
            let discrim = b * b / 4 + a * a * a / 27;
            const halfB = b / 2;
            let tmp;
            if (Math.abs(discrim) <= this.TOLERANCE) {
                discrim = 0;
            }
            if (discrim > 0) {
                let root;
                const e = Math.sqrt(discrim);
                let tmp = -halfB + e;
                if (tmp >= 0) {
                    root = Math.pow(tmp, 1 / 3)
                } else {
                    root = -Math.pow(-tmp, 1 / 3);
                }
                tmp = -halfB - e;
                if (tmp >= 0) {
                    root += Math.pow(tmp, 1 / 3)
                } else {
                    root -= Math.pow(-tmp, 1 / 3);
                }
                result = [...result, root - offset];
            } else if (discrim < 0) {
                const distance = Math.sqrt(-a / 3);
                const angle = Math.atan2(Math.sqrt(-discrim), -halfB) / 3;
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
                const sqrt3 = Math.sqrt(3);
                result = [
                    ...result,
                    2 * distance * cos - offset,
                    -distance * (cos + sqrt3 * sin) - offset,
                    -distance * (cos - sqrt3 * sin) - offset
                ];
            } else {
                if (halfB >= 0) {
                    tmp = -Math.pow(halfB, 1 / 3);
                } else {
                    tmp = Math.pow(-halfB, 1 / 3);
                }
                result = [
                    ...result,
                    2 * tmp - offset,
                    -tmp - offset
                ];
            }
        }
        return result;
    }
    get quarticRoots() {
        let result = [];
        if (this.degree === 4) {
            const c4 = this.coefs[4];
            const c3 = this.coefs[3] / c4;
            const c2 = this.coefs[2] / c4;
            const c1 = this.coefs[1] / c4;
            const c0 = this.coefs[0] / c4;
            const tmpList = [
                1,
                -c2,
                c3 * c1 - 4 * c0,
                -c3 * c3 * c0 + 4 * c2 * c0 - c1 * c1
            ].reverse();
            const resolveRoots = new Polynomial2D(tmpList).cubicRoots;
            tmpList.length = 0;
            const y = resolveRoots[0];
            let discrim = c3 * c3 / 4 - c2 + y;
            if (Math.abs(discrim) <= this.TOLERANCE) {
                discrim = 0;
            }
            if (discrim > 0) {
                const e = Math.sqrt(discrim);
                const t1 = 3 * c3 * c3 / 4 - e * e - 2 * c2;
                const t2 = (4 * c3 * c2 - 8 * c1 - c3 * c3 * c3) / (4 * e);
                let plus = t1 + t2;
                let minus = t1 - t2;
                if (Math.abs(plus) <= this.TOLERANCE) {
                    plus = 0;
                }
                if (Math.abs(minus) <= this.TOLERANCE) {
                    minus = 0;
                }
                if (plus >= 0) {
                    const f = Math.sqrt(plus);
                    result = [...result, -c3 / 4 + (e + f) / 2, -c3 / 4 + (e - f) / 2];
                }
                if (minus >= 0) {
                    const f = Math.sqrt(minus);
                    result = [...result, -c3 / 4 + (f - e) / 2, -c3 / 4 - (f + e) / 2];
                }
            } else {
                let t2 = y * y - 4 * c0;
                if (t2 >= -this.TOLERANCE && t2 < 0) {
                    t2 = 2 * sqrt(t2);
                    const t1 = 3 * c3 * c3 / 4 - 2 * c2;
                    if (t1 + t2 >= this.TOLERANCE) {
                        d = sqrt(t1 + t2);
                        result = [...result, -c3 / 4 + d / 2, -c3 / 4 - d / 2];
                    }
                    if (t1 - t2 >= this.TOLERANCE) {
                        d = Math.sqrt(t1 - t2);
                        result = [...result, -c3 / 4 + d / 2, -c3 / 4 - d / 2];
                    }
                }
            }
        }
        return result;
    }
    destroy() {
        this.coefs.length = 0;
    }
    eval(x) {
        let result = 0;
        for (let i = this.coefs.length - 1; i > 0; i--) {
            result = result * x + this.coefs[i];
        }
        return result;
    }
    multiply(poly) {
        result = new Polynomial2D();
        for (let i = 0; i < this.degree + poly.degree; i++) {
            result.coefs = [...result.coefs, 0];
        }
        result.coefs = result.coefs.reverse();
        for (let i = 0; i < this.degree; i++) {
            for (let j = 0; j < poly.degree; j++) {
                result.coefs[i + j] = result.coefs[i + j] + (this.coefs[i] * poly.coefs[j]);
            }
        }
        return result;
    }
    divide_scalar(scalar) {
        this.coefs.forEach(coef => {
            coef /= scalar;
        });
    }
    simplify() {
        for (let i = this.degree; i > 0; i--) {
            if (Math.abs(this.coefs[i]) <= this.TOLERANCE) {
                this.coefs.pop();
            } else {
                break;
            }
        }
    }
    bisection(min, max) {
        let result;
        let minValue = this.eval(min);
        let maxValue = this.eval(max);
        if (Math.abs(minValue) <= this.TOLERANCE) {
            result = min;
        } else if (Math.abs(maxValue) <= this.TOLERANCE) {
            result = max;
        } else if (minValue * maxValue <= 0) {
            const tmp1 = Math.log10e(max - min);
            const tmp2 = Math.log10e(10) * this.ACCURACY;
            const iters = Math.ceil((tmp1 + tmp2) / log10e(2));
            for (let i = 0; i < iters; i++) {
                result = 0.5 * (min + max);
                const value = this.eval(Result);
                if (Math.abs(value) <= this.TOLERANCE) {
                    break;
                }
                if (value * minValue < 0) {
                    max = result;
                    maxValue = value;
                } else {
                    min = result;
                    minValue = value;
                }
            }
        }
        return result;
    }
    rootsInInterval(min, max) {
        let roots = [];
        if (this.degree === 1) {
            root = this.bisection(min, max);
            if (root !== 0) {
                roots = [...roots, root];
            }
        } else {
            const deriv = this.derivative;
            const droots = deriv.rootsInInterval(min, max);
            if (droots.length > 0) {
                let root = this.bisection(min, droots[0]);
                if (root !== 0) {
                    roots = [...roots, root];
                }
                for (let i = 0; i < droots.length - 2; i++) {
                    root = this.bisection(droots[i], droots[i + 1]);
                    if (root !== 0) {
                        roots = [...roots, root];
                    }
                }
                root = this.bisection(droots[droots.length - 1], max);
                if (root !== 0) {
                    roots = [...roots, root];
                }
            } else {
                const root = this.bisection(min, max);
                if (root !== 0) {
                    roots = [...roots, root];
                }
            }
        }
        return roots;
    }
    atan2(x, y) {
        const sgn = (a) => {
            return a < 0 ? -1 : 1;
        };
        if (x > 0) {
            return atan(y / x);
        } else if (x < 0) {
            return atan(y / x) + pi;
        } else {
            return pi / 2 * sgn(y);
        }
    }
}