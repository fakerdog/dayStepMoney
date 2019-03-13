/**抽奖js */

const app = getApp();

//发起助力
function toAssistance(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/toAssistance.htm',
    method: "POST",
    data: {},
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);

      }
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}

function getAssistList(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/getAssistOpenidList.htm',
    method: "POST",
    data: {},
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);

      }
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}
function assistFriend(friendopenid,cb,cb2) {
  wx.showLoading({
    title: '助力中',
  })
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/toAssistanceOthers.htm',
    method: "POST",
    data: { friendopenid: friendopenid},
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);

      }
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    },
    complete:function(res){
      cb2();
      wx.hideLoading();//数据加载完成
    }
  });
}
module.exports = {
  toAssistance: toAssistance,
  getAssistList: getAssistList,
  assistFriend: assistFriend
}