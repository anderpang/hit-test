# hitTest
简单2D碰撞检测

## Install

You can install it via npm:

```html
npm install hit-test
```
## Use
```js
import hitTest from "hit-test";
```
javascript:
```html
<script src="dist/hitTest.js"></script>
```

## Example
#### 矩形 & 矩形
```js
   var rect1={
       x:0,
       y:0,
       width:50,
       height:60
   };

   var rect2={
       x:50,
       y:80,
       x:100,
       height:80
   };

   if(hitTest.Rectangle(rect1,rect2)){
       console.log("碰撞");
   }
   else{
       console.log("不碰撞");
   }
   
```
#### 圆形 & 圆形
```js
   var circle1={
       x:0,
       y:0,
       radius:10
   };

   var circle2={
       x:50,
       y:80,
       radius:15
   };

   if(hitTest.Circle(circle1,circle2)){
       console.log("碰撞");
   }
   else{
       console.log("不碰撞");
   }
```

#### 矩形 & 圆形

```js
   var rect1={
       x:0,
       y:0,
       width:50,
       height:60
   };

   var circle2={
       x:50,
       y:80,
       radius:15
   };

   if(hitTest.RectangleCircle(rect1,circle2)){
       console.log("碰撞");
   }
   else{
       console.log("不碰撞");
   }
```
#### 矩形（带旋转角) & 圆形

只能判断以矩形中心为旋转中心的情况

```js
   var rect1={
       x:0,
       y:0,
       width:50,
       height:60,
       rotation:1.3    //弦度
   };

   var circle2={
       x:50,
       y:80,
       radius:15
   };

   if(hitTest.RectangleCircleAngle(rect1,circle2,rect1.rotation)){
       console.log("碰撞");
   }
   else{
       console.log("不碰撞");
   }
```

#### 多边形 & 多边形
```js
  var points1=[194,212, 235,170,216,107,136,136,146,196];
  var points2=new Float32Array([250, 208, 305,247,402, 238, 340, 150]);

   if(hitTest.Polygon(points1,points2)){
       console.log("碰撞");
   }
   else{
       console.log("不碰撞");
   }
```

