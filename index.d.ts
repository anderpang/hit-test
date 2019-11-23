/*!
* 2D碰撞检测
* <anderpang@foxmail.com>
*/
interface IDot {
    x: number;
    y: number;
}
interface IRect extends IDot {
    width: number;
    height: number;
}
interface ICircle extends IDot {
    radius: number;
}
declare var hitTest: {
    Rectangle: (a: IRect, b: IRect) => boolean;
    Circle: (a: ICircle, b: ICircle) => boolean;
    RectangleCircle: (a: IRect, b: ICircle) => boolean;
    RectangleCircleAngle: (a: IRect, b: ICircle, rad: number) => boolean;
    Polygon: (vertices1: number[] | ArrayLike<number>, vertices2: number[] | ArrayLike<number>) => boolean;
};
export default hitTest;
