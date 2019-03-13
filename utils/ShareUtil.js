const app = getApp();

function shareCard(){
  var cardWords = ["你本学期的课程表已生成，请惠存！", "所有的好学生，都是因为用对了课程表！", "这款课程表，一键导入，信不信由你！", "你的好友邀请你一键导入课程表！", "用了这款课程表，男女朋友全都有！", "你的好友给你备好了课程表，请签收！", "不要轻易点我，我怕你会爱上我！", "香蕉课程表，让你的课程表不再又胖又丑！", "课程表用得好，奖学金立马到手！"];
  var indexCard = Math.floor((Math.random() * cardWords.length));
  var cardWord = cardWords[indexCard];
  return {
    title: cardWord,
    imageUrl: "../../images/shareCard.png",
    path: '/pages/index/index?sence=' + app.globalData.openid
  }
}

module.exports = {
  shareCard: shareCard
}

