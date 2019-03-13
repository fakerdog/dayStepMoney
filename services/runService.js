const app = getApp();
function getSysInfo(cb){
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/getSysInfo.htm',
    method: "POST",
    data: {
    },
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
    },
    complete() {

    }
  });
}
/**获取运动信息 **/
function encryptWeRunData(encryptedData, iv, code, cb) {
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/encryptWeRunData.htm',
    method: "POST",
    data: {
      encryptedData: encryptedData,
      iv: iv,
      code: code
    },
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
    },
    complete() {
     
    }
  });

}
/** 获取30天内未解锁步数**/
function getRunDataList(cb) {
  wx.showLoading({
    title: '数据加载中',
    mask:true
  })
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/exchangeAll.htm',
    method: "POST",
    data: {
    },
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
    },
    complete() {
    }
  });

}
/**群分享成功解锁**/
function groupshare(date, cb) {
  wx.showLoading({
    title: '数据加载中',
  })
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/exchangeSteps.htm',
    method: "POST",
    data: {
      date: date
    },
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
    },
    complete() {
      wx.hideLoading();//数据加载完成
    }
  });
}
/** 立即兑换**/
function unlocktoday(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/exchangeSj.htm',
    method: "POST",
    data: {
    },
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
      wx.hideLoading();//数据加载完成
    },
    complete() {
     
    }
  });
}
/**朋友解锁 */
function friendhelp(friendopenid, date, cb,cb2) {
  wx.showLoading({
    title: '解锁中',
  })
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/exchangeOthers.htm',
    method: "POST",
    data: {
      friendopenid: friendopenid,
      date: date
    },
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
      wx.showToast({
        title: '解锁失败',
      })
    },
    complete() {
      cb2();
      wx.hideLoading();//数据加载完成
    }
  });
}
/**获取水晶记录**/
function getrecordlist(cb) {
  wx.showLoading({
    title: '数据加载中',
  })
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/DrawIdeamoneyRecordList.htm',
    method: "POST",
    data: {
    },
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
    },
    complete() {
      wx.hideLoading();//数据加载完成
    }
  });
}

/**获取水晶记录**/
function getExchangeData(cb) {
  wx.showLoading({
    title: '数据加载中',
  })
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/getExchangeData.htm',
    method: "POST",
    data: {
    },
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
    },
    complete() {
      wx.hideLoading();//数据加载完成
    }
  });
}
//后台实现换钱接口
function exchangemoney(idealmoney, cb, cb2) {
  wx.showLoading({
    title: '换钱处理中...',
  });
  wx.login({
    success: res => {
      //从开发服务器获取openid
      var code = res.code;
      wx.request({
        url: app.HTTP_SERVER + 'run/rundata/exchangemoney.htm',
        method: "POST",
        data: {
          idealmoney: idealmoney,
          jscode: code
        },
        header: {
          'appid': app.APP_ID,
          'sessionkey': app.globalData.sessionkey,
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if (typeof cb === "function") {
            cb(res);

          }
        },
        fail: function (res) {
          cb2()
        },
        complete: function (res) {
          wx.hideLoading();
        }
      });
    }
  })
}

/**获取水晶记录**/
function getExchangeProportion(cb) {
  wx.showLoading({
    title: '数据加载中',
  })
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/getExchangeProportion.htm',
    method: "POST",
    data: {
    },
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
    },
    complete() {
      wx.hideLoading();//数据加载完成
    }
  });
}

/**获取赠送人列表 **/
function getGiveAwayList(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/getAwayRecord.htm',
    method: "POST",
    data: {
    },
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
    },
    complete() {

    }
  });

}
//获取别人送的步数
function exchangeGiveAway(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'run/rundata/exchangeGiveStep.htm',
    method: "POST",
    data: {
    },
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
    },
    complete() {

    }
  });

}

//捐赠接口
function giveawaymystep(steps, friendopenid, cb, cb2) {
  wx.showLoading({
    title: '捐赠中...',
  });
  wx.login({
    success: res => {
      //从开发服务器获取openid
      var code = res.code;
      wx.request({
        url: app.HTTP_SERVER + 'run/rundata/toawayStepRecord.htm',
        method: "POST",
        data: {
          friendopenid:friendopenid,
          steps: steps,
          jscode: code
        },
        header: {
          'appid': app.APP_ID,
          'sessionkey': app.globalData.sessionkey,
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if (typeof cb === "function") {
            cb(res);

          }
        },
        fail: function (res) {
          cb2()
        },
        complete: function (res) {
          wx.hideLoading();
        }
      });
    }
  })
}

module.exports = {
  encryptWeRunData: encryptWeRunData,
  getRunDataList: getRunDataList,
  groupshare: groupshare,
  unlocktoday: unlocktoday,
  friendhelp: friendhelp,
  getrecordlist: getrecordlist,
  getExchangeData: getExchangeData,
  exchangemoney: exchangemoney,
  getExchangeProportion: getExchangeProportion,
  getGiveAwayList: getGiveAwayList,
  exchangeGiveAway: exchangeGiveAway,
  giveawaymystep: giveawaymystep,
  getSysInfo: getSysInfo
}