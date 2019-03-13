
/**
 * 建议反馈
 */
const app = getApp();

//传输formid
function sendAdvise(data,cb){
  data.appId = app.APP_ID;
  wx.request({
    url: app.HTTP_SERVER + 'app/commonrest/submitAdvise.htm',
    method: "POST",
    data: data,
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: res => {
      cb(res);
    }
  })
}

//export
module.exports = {
  sendAdvise: sendAdvise,
}

