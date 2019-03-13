const app = getApp();

//生成抽奖随机数组
function getRandomArrayElements(cb) {
  var arr = ['A', 'A', 'A', 'A', 'B', 'B', 'C', 'D', 'D', 'D','E','E','G','G'];
  var count = 14;
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp, index;
  while (i--> min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;  
  }
  cb(shuffled.slice(min));
}
//新用户第一次专用数据
function getNewRandomArrayElements(cb) {
  var arr = ['A', 'A', 'B', 'G', 'C'];
  var count = 5;
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  cb(shuffled.slice(min));
}
//生成数组，随机取出对应长度的数组
function getRandomArrayElementsHead(arr, count, cb) {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  cb(shuffled.slice(min));
}

//判断数字长度BigDecimal
function changeTwoDecimal_f(floatvar, cb) {
  var f_x = parseFloat(floatvar);
  if (isNaN(f_x)) {
    alert('function:changeTwoDecimal->parameter error');
    return false;
  }
  var f_x = Math.round(x * 100) / 100;
  var s_x = f_x.toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }
  cb(s_x);
}
module.exports = {
  getRandomArrayElements: getRandomArrayElements,
  getRandomArrayElementsHead: getRandomArrayElementsHead,
  getNewRandomArrayElements:getNewRandomArrayElements
}