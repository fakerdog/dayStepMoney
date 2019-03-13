/**
 * 分享文案、排行
 */
const app=getApp();

/**
 * 根据步数返回 网友百分比和文案
 */
function getRateAndLetters(stepValue, totalDates) {
  if (!stepValue){
    stepValue = 0;
  }
  if (!totalDates){
    totalDates = 1;
  }
  var avgSteps = (stepValue / totalDates).toFixed(0);
  var rate = 78.8;
  try{
    if (avgSteps == 0){
      rate = 0;
    } else if (avgSteps > 0 && avgSteps < 4000){
      rate = new Number((avgSteps / 10000).toFixed(1)) + 20;
    } else if (avgSteps >= 4000 && avgSteps < 6000) {
      rate = new Number((avgSteps / 10000).toFixed(1)) + 40;
    } else if (avgSteps >= 6000 && avgSteps < 7000) {
      rate = new Number((avgSteps / 10000).toFixed(1)) + 60;
    } else if (avgSteps >= 7000 && avgSteps < 9000) {
      rate = new Number((avgSteps / 10000).toFixed(1)) + 70;
    } else if (avgSteps >= 9000 && avgSteps < 13000) {
      rate = new Number((avgSteps / 10000).toFixed(1)) + 80;
    } else if (avgSteps >= 13000 && avgSteps < 17000) {
      rate = new Number((avgSteps / 10000).toFixed(1)) + 90;
    } else if (avgSteps >= 17000 && avgSteps < 20000) {
      rate = new Number((avgSteps / 10000).toFixed(1)) + 95;
    } else{
      rate = 99.9;
    }
    if(rate > 99.9){
      rate = 99.9;
    }
  }catch(e){
    rate = 78.8;
  }
  if (stepValue == 0){
    rate = 0;
  }
  return {
    rate: rate,
    avgSteps: avgSteps,
    letters: ""
  };
}

function getShareLetters(){
  var letterArr = [
    ["生命在于运动","— 伏尔泰"],
    ["运动是一切生命的源泉","— 达·芬奇"],
    ["只有运动才可以除去各种各样的疑虑","— 歌德"],
    ["生命就是运动，人的生命就是运动","— 列夫·托尔斯泰"],
    ["生命不息，运动不止", "— 谚语"],
    ["生活多美好啊，体育锻炼乐趣无穷"," — 普希金"],
    ["静止便是死亡，只有运动才能敲开永生的大门"," — 泰戈尔"],
    ["发展体育运动，增强人民体质"," — 毛泽东"],
    ["我生平喜欢步行，运动给我带来了无穷的乐趣","— 爱因斯坦"],
    ["再忙，也要运动","— 谚语"],
    ["我生平喜欢步行，运动给我带来了无穷的乐趣", "— 爱因斯坦"],
    ["再忙，也要运动", "— 谚语"]
  ];
  return letterArr[rand(0, 10)];
}

function rand(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}

function getgiveawayList(count){
  var  giveawaylist = [];
  for(var i=0;i<count;i++){
    giveawaylist[i] = {
      avatarUrl: app.CDN_URL + "assistfriend.png",
      giveawaysteps: ""
    }
  }
  return giveawaylist;
}

module.exports = {
  getRateAndLetters: getRateAndLetters,
  getShareLetters: getShareLetters,
  getgiveawayList: getgiveawayList
}
