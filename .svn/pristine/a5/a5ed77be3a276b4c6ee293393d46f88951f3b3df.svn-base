const app = getApp();
/**动态数字
 * 旧数字、新数字、幅度、保留位数、延迟、回调1,回调2
 */
function numberAnimation(oldnumber, newnumber, size, point, delay,cb1, cb2) {
  setTimeout(function() {
    point = parseInt(point) >= 0 && parseInt(point) <= 20 ? point : 2
    oldnumber = Number(oldnumber);
    newnumber = Number(newnumber);
    var flag = 1;
    if (newnumber < oldnumber) {
      flag = -1;
    }
    if (flag == 1) {
      oldnumber = oldnumber + size > newnumber ? newnumber : oldnumber + size
    } else {
      oldnumber = oldnumber - size < newnumber ? newnumber : oldnumber - size
    }
    oldnumber = oldnumber.toFixed(point);
    cb2(oldnumber);
    if (oldnumber < newnumber) {
      numberAnimation(oldnumber, newnumber, size, point, delay, cb1,cb2)
    }else{
      cb1();
    }
  }, delay)
}
/**
 * 转盘旋转动画
 * 旋转角度，动画时间，旋转效果,回调函数
 */
function rotateAnimation(runDeg, duration, timingFunction,cb){
  // 旋转角度
  runDeg = runDeg || 0;
  //创建动画
  var animationRun = wx.createAnimation({
    duration: duration,
    timingFunction: timingFunction
  })
  animationRun.rotate(runDeg).step();
  cb(animationRun.export(), runDeg);
}
module.exports = {
  numberAnimation: numberAnimation,
  rotateAnimation: rotateAnimation
}