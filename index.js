"use strict";
/*!
* 2D碰撞检测
* <anderpang@foxmail.com>
*/
Object.defineProperty(exports, "__esModule", { value: true });

var hitTest = {
    //矩形&矩形
    Rectangle: function (a, b) {
        return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    },
    //圆&圆
    Circle: function (a, b) {
        var r2 = b.radius + a.radius, dx = b.x - a.x, dy = b.y - a.y;
        return dx * dx + dy * dy < r2 * r2;
    },
    //矩形&圆
    RectangleCircle: function (a, b) {
        var x, y, r = b.radius;
        x = b.x < a.x ? a.x : b.x > a.x + a.width ? a.x + a.width : b.x;
        y = b.y < a.y ? a.y : b.y > a.y + a.height ? a.y + a.height : b.y;
        x -= b.x;
        y -= b.y;
        return x * x + y * y < r * r;
    },
    //带角度的矩形&圆(只能是矩形中心为旋转中心)
    RectangleCircleAngle: function (a, b, rad) {
        var a1 = Object.create(null), b1 = Object.create(null), halfWidth = a.width * 0.5, halfHeight = a.height * 0.5, px = a.x, py = a.y, rx = b.x, ry = b.y, sin = Math.sin(rad), cos = Math.cos(rad), 
        //旋转后的坐标（矩的中心点）
        rpx = cos * px + sin * py, rpy = cos * py - sin * px;
        a1.x = rpx - halfWidth;
        a1.y = rpy - halfHeight;
        a1.width = a.width;
        a1.height = a.height;
        b1.x = cos * rx + sin * ry;
        b1.y = cos * ry - sin * rx;
        b1.radius = b.radius;
        return this.RectangleCircle(a1, b1);
    },
    //多边形
    Polygon: function (vertices1, vertices2) {
        //如果有间隙，那就返回false(非碰撞)
        if (watchPolygon(vertices1, vertices2)) {
            return false;
        }
        if (watchPolygon(vertices2, vertices1)) {
            return false;
        }
        //如果都没有分离的，那就是触碰了
        return true;
    }
};
//观看多边形是否有间隔
function watchPolygon(target, other) {
    var perp = Object.create(null), pros1, pros2, baseX, baseY;
    for (var i = 0, ii = target.length; i < ii; i += 2) {
        baseX = target[(i - 2 + ii) % ii];
        baseY = target[(i - 1 + ii) % ii];
        //a向量计算
        // a.x=target[i]-baseX;
        // a.y=target[i+1]-baseY;
        //垂线计算
        perp.x = baseY - target[i + 1]; //-a.y;
        perp.y = target[i] - baseX; //a.x;
        pros1 = projection(perp, target);
        pros2 = projection(perp, other);
        //判断是分离的就返回false
        if (pros1[0] > pros2[1] || pros1[1] < pros2[0]) {
            return true;
        }
    }
    return false;
}
//点乘
function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}
//多边形对垂线投影
function projection(perp, arr) {
    var a = Object.create(null), //向量a
    i = 2, ii = arr.length, min, max, tmp;
    a.x = arr[0];
    a.y = arr[1];
    min = max = dot(a, perp);
    for (; i < ii; i += 2) {
        a.x = arr[i];
        a.y = arr[i + 1];
        tmp = dot(a, perp);
        if (tmp < min) {
            min = tmp;
        }
        else if (tmp > max) {
            max = tmp;
        }
    }
    return [min, max];
}
exports.default = hitTest;
